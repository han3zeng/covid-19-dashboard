# Install dependencies only when needed
FROM node:alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /covid-19-dashboard
COPY package*.json ./
RUN npm install


# Rebuild the source code only when needed
FROM node:alpine AS builder
WORKDIR /covid-19-dashboard
COPY . .
COPY --from=deps /covid-19-dashboard/node_modules ./node_modules
RUN npm install
RUN npm run build


# Production image, copy all the files and run next
FROM node:alpine AS runner
WORKDIR /covid-19-dashboard

# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /covid-19-dashboard/client_secret.json ./client_secret.json
COPY --from=builder /covid-19-dashboard/token.json ./token.json 
COPY --from=builder /covid-19-dashboard/utils ./utils
COPY --from=builder /covid-19-dashboard/utils ./utils
COPY --from=builder /covid-19-dashboard/server.js ./server.js
COPY --from=builder /covid-19-dashboard/public ./public
COPY --from=builder --chown=nextjs:nodejs /covid-19-dashboard/.next ./.next
COPY --from=builder /covid-19-dashboard/node_modules ./node_modules
COPY --from=builder /covid-19-dashboard/package.json ./package.json

# USER nextjs

EXPOSE 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["npm", "start"]
