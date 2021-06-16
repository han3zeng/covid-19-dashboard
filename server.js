const express = require('express')
var fs = require('fs')
const expressServer = express()
const port = process.env.PORT
const { parse } = require('url')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const getSpreadsheetData = require('./utils/spreadsheet')
const { sheetDataProcessor } = require('./utils/processor')
const { logger, getLogObject } = require('./utils/create-logger');

const redis = require('redis')
let client = null

const DATA_KEY = 'spreadsheet'
const UPDATED_AT = 'updatedAt'
const UPDATE_INTERVAL = 1;

const logDir = './logs'
if (!fs.existsSync(logDir)){
    fs.mkdirSync(logDir);
}

let initializedErro = null;

try {
  let initialized = null
  client = redis.createClient({
    host: process.env.REDIS_HOST,
    post: process.env.REDIS_PORT,
    connect_timeout: 300000
  })
  client.on('error', function (error) {
    if (!initialized && error) {
      initializedErro = true;
      initialized = true
      logger.log(getLogObject({
        level: 'error',
        message: 'redis on client error',
        error,
        filename: 'server.js'
      }))
    }
  })
} catch (error) {
  initializedErro = true;
  logger.log(getLogObject({
    level: 'error',
    message: 'redis createClient error',
    error,
    filename: 'server.js'
  }))
}

function fetchFromRedis({
  res,
}) {
  client.get(DATA_KEY, (err, spreadsheet) => {
    if (err) {
      logger.log(getLogObject({
        level: 'error',
        message: `redis get key: ${DATA_KEY} error`,
        error: err,
        filename: 'server.js'
      }))
      return
    }
    try {
      const result = JSON.parse(spreadsheet)
      res.json(result)
    } catch (err) {
      logger.log(getLogObject({
        level: 'error',
        message: 'server try to parse final spreadsheet data',
        error: err,
        filename: 'server.js'
      }))
      res.json({
        error: err
      })
    }
  })
}

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
      client.set(DATA_KEY, spreadsheetJSONString, (error) => {
        if (error) {
          logger.log(getLogObject({
            level: 'error',
            message: `redis set redis key: ${DATA_KEY} error`,
            error,
            filename: 'server.js'
          }))
        }
      })
      client.set(UPDATED_AT, currentTimestamp, (err) => {
        if (err) {
          logger.log(getLogObject({
            level: 'error',
            message: `redis set redis key: ${UPDATED_AT} error`,
            error: err,
            filename: 'server.js'
          }))
        }
      })
      res.json(spreadsheet)
    })
    .catch(({
      message,
      error
    }) => {
      logger.log(getLogObject({
        level: 'error',
        message,
        error,
        filename: 'spreadsheet.js'
      }))
      fetchFromRedis({
        res,
      })
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
    if ((updatedAt && timeInterval >= UPDATE_INTERVAL) || !updatedAt) {
      fetchFromGoogleAndWrite({
        res,
        currentTimestamp
      })
    } else {
      fetchFromRedis({
        res,
      })
    }
  })
}

app.prepare().then(() => {
  expressServer.get('/fetch-data', (req, res) => {
    if (initializedErro) {
      res.status(500).json({
        error: 'redis sever initilization error'
      })
    } else {
      fetchSpreadsheetData({
        res
      })
    }
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
