const { createLogger, format, transports } = require('winston')
const { timestamp, json, prettyPrint } = format
const path = require('path')
const base = path.resolve(process.cwd(), 'logs')

const logger = createLogger({
  format: format.combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    json(),
    prettyPrint()
  ),
  defaultMeta: { service: 'covid-19-dashboard' },
  transports: [
    new transports.File({ filename: `${base}/error.log`, level: 'error' }),
    new transports.File({ filename: `${base}/history.log`, level: 'info' })
  ]
})


const getLogObject = ({
  level = null,
  filename = null,
  message = null,
  error = null,
}) => ({
  level,
  filename,
  message,
  error
})

module.exports = {
  logger,
  getLogObject
}
