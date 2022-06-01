const express = require('express')
const { sendMessage } = require('../Controller/Messages')
const router = express.Router()

router.post('/', sendMessage)

module.exports = router
