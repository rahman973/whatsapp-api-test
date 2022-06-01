const logger = require('./logger')

require('dotenv').config()

const envVariables = {
  DB_URL: process.env.DB_URL,
  PORT: process.env.PORT,
  TOKEN: process.env.TOKEN,
  SEND_MESSAGE_URL: process.env.SEND_MESSAGE_URL,
}

const checkEnvs = async () => {
  try {
    Object.keys(envVariables).forEach((variable) => {
      if (!envVariables[variable]) {
        throw Error(`env variable '${variable}' is missing`)
      }
    })
  } catch (error) {
    logger.error('error in environment variables')
    logger.error(error.message)
    process.exit(1)
  }
}

module.exports = checkEnvs
