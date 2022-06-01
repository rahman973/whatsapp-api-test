const winston = require('winston')
const moment = require('moment')

const fs = require('fs')
const dir = './logs'

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}

const format1 = 'YYYY-MM-DD'
const date = new Date()
const fileName = moment(date).format(format1)
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
  success: 5,
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
  success: 'blue',
}

winston.addColors(colors)

const options = {
  console: {
    level: 'debug',
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.timestamp({ format: 'HH:mm:ss:ms' }),
      winston.format.colorize(),
      winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
      ),
      winston.format.printf((info) => {
        if (typeof info.message === 'object') {
          info.message = JSON.stringify(info.message, null, 3)
        }
        return `${info.timestamp} ${info.level}: ${info.message}`
      })
    ),
  },
}

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(options.console),
    new winston.transports.File({
      filename: `logs/${fileName}.log`,
      ...options,
    }),
  ],
  exitOnError: false,
  levels,
})

module.exports = logger
