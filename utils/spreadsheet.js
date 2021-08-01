const https = require('https')
const http = require('http')
const URL_PROD = 'https://tpts-public.s3.ap-southeast-1.amazonaws.com/covid-19-dashboard/content-covid-19-dashboard-v2.json'
const URL_DEV = 'http://localhost:8080/content-covid-19-dashboard-v2'

const scheme = process.env.NODE_ENV === 'production' ? https : http
const url = process.env.NODE_ENV === 'production' ? URL_PROD : URL_DEV

async function getSpreadsheetData () {
  const promise = new Promise((resolve, reject) => {
    scheme
      .get(
        url,
        (res) => {
          const { statusCode } = res
          const contentType = res.headers['content-type']
          let error
          if (statusCode < 200 || statusCode > 299) {
            error = new Error(
              'Request Failed.\n' + `Status Code: ${statusCode}`
            )
          } else if (!/^application\/json/.test(contentType)) {
            error = new Error(
              'Invalid content-type.\n' +
                `Expected application/json but received ${contentType}`
            )
          }
          if (error) {
            // Consume response data to free up memory
            res.resume()
            reject({
              message: error.message,
              error: null
            })
            return
          }
          res.setEncoding('utf8')
          let rawData = ''
          res.on('data', (chunk) => {
            rawData += chunk
          })
          res.on('end', () => {
            try {
              const parsedData = JSON.parse(rawData)
              resolve(parsedData)
            } catch (e) {
              reject({
                message: e.message,
                error: null
              })
            }
          })
        }
      )
      .on('error', (e) => {
        console.error(`Got error: ${e.message}`)
      })
  })
  return promise
}

module.exports = getSpreadsheetData
