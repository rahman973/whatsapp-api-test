const express = require('express')
const cors = require('cors')
const logger = require('./config/logger')
const dbConnect = require('./config/db')
const morgan = require('morgan')
const checkEnvs = require('./config/envCheck')

require('./config/envCheck')
checkEnvs()
dbConnect()

const app = express()

app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ limit: '10kb', extended: true }))

app.use(cors())
app.use(morgan('short'))

app.use('/api/v1', require('./V1/Routes/index'))
const _port = process.env.PORT || 3002

require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  if (err) {
    logger.error(err)
  }
  logger.info(`IP Address: ${add}`)
})

app.use('/', (req, res) => {
  return res
    .status(404)
    .send(
      " <span  style='text-align: center'> <h1 > server is up and running  </h1><h3 > Requested page not found  </h3> <p  style='text-align: center'><i > developed by chrahman973@gmail.com</i></p></span>"
    )
})

app.listen(_port, () => {
  logger.info(`App is listening at ${_port}`)
})
