const express = require('express')
const router = express.Router()

router.use('/health', require('./Health'))
router.use('/webhook', require('./WebHooks'))
router.use('/send-message', require('./SendMessage'))
module.exports = router
