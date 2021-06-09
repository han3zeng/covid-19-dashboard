const { logger, getLogObject } = require('./create-logger')

const TIMESTAMP = 'timestamp'
const STATS = 'stats'
const H1 = 'h1'
const H2 = 'h2'
const BODY = 'body'

const TYPE = 'type'
const KEY = 'key'
const LABEL = 'label'
const CONTENT = 'content'

const KEYS = [TYPE, KEY, LABEL, CONTENT]

const createElement = ({ row, result }) => {
  // console.log('row: ', row)
  const type = row[KEYS.indexOf(TYPE)]
  const key = row[KEYS.indexOf(KEY)]
  const content = row[KEYS.indexOf(CONTENT)]
  if (type === TIMESTAMP) {
    result[`${type}_${key}`] = content
  } else if (type === STATS) {
    const label = row[KEYS.indexOf(LABEL)]
    result[`${type}_${key}`] = {
      content,
      label
    }
  } else if (type === H1) {
    result[`${type}_${key}`] = content
  } else if (type === H2) {
    result[`${type}_${key}`] = content
  } else if (type === BODY) {
    // default as body
    result[`${type}_${key}`] = content
  } else {
    logger.log(getLogObject({
      filename: 'processor',
      level: 'warning',
      message: 'undefined content type from google spreadsheet whicn can\'t be handle'
    }))
  }
  return result
}

const sheetDataProcessor = ({
  rawData = []
}) => {
  if (!Array.isArray(rawData) || (Array.isArray(rawData) && rawData.length === 0)) {
    return
  }
  return rawData.reduce((accumulator, row) => {
    return createElement({ row, result: accumulator })
  }, {})
}

module.exports = {
  sheetDataProcessor
}
