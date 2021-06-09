// server.js

const express = require('express')
const expressServer = express()
const port = process.env.PORT
const { parse } = require('url')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const getSpreadsheetData = require('./utils/spreadsheet')
const { sheetDataProcessor } = require('./utils/processor')

const redis = require('redis')
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  post: process.env.REDIS_PORT
})
const DATA_KEY = 'spreadsheet'
const UPDATED_AT = 'updatedAt'
client.on('error', function (error) {
  console.error(error)
})

function fetchFromGoogleAndWrite ({
  res,
  currentTimestamp
}) {
  const promise = getSpreadsheetData()
  promise
    .then((rawSpreadsheet) => {
      const spreadsheet = sheetDataProcessor({
        rawData: rawSpreadsheet
      })
      const spreadsheetJSONString = JSON.stringify(spreadsheet)
      client.set(DATA_KEY, spreadsheetJSONString, (err) => {
        if (err) {
          console.log('redis set spreadsheet error:', err)
        }
      })
      client.set(UPDATED_AT, currentTimestamp, (err) => {
        if (err) {
          console.log('redis set UPDATED_AT error:', err)
        }
      })
      console.log('updateAndWrite')
      res.json(spreadsheet)
    })
    .catch(({ info, err }) => {
      console.log(info)
      console.log(err)
    })
}

function fetchSpreadsheetData ({
  res
}) {
  const currentTimestamp = Date.now()
  client.get(UPDATED_AT, (err, updatedAt) => {
    if (err) {
      console.log('fetch updatedAt err: ', err)
      return
    }
    const updatedAtInt = parseInt(updatedAt)
    const timeInterval = Math.floor((currentTimestamp - updatedAtInt) / 1000)
    console.log('timeInterval: ', timeInterval)
    if ((updatedAt && timeInterval >= 10) || !updatedAt) {
      fetchFromGoogleAndWrite({
        res,
        currentTimestamp
      })
    } else {
      client.get(DATA_KEY, (err, spreadsheet) => {
        if (err) {
          console.log('redis get spreadsheet error: ', err)
          return
        }
        console.log('cache')
        try {
          const result = JSON.parse(spreadsheet)
          res.json(result)
        } catch (err) {
          res.json({
            err
          })
        }
      })
    }
  })
}

app.prepare().then(() => {
  expressServer.get('/fetch-data', (req, res) => {
    fetchSpreadsheetData({
      res
    })
  })
  expressServer.get('/*', (req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl
    handle(req, res, parsedUrl)
  })
  expressServer.listen(port, () => {
    console.log(`the app is listening at http://localhost:${port}`)
  })
})
