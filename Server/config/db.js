const mongoose = require('mongoose')
const logger = require('./logger')
require('dotenv').config()
const db = process.env.DB_URL
const dbConnect = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    logger.info('database connected successfully')
  } catch (err) {
    logger.info(err.message)
    process.exit(1)
  }
}

module.exports = dbConnect
