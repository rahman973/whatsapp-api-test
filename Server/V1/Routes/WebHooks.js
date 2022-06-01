const express = require('express')
const { verifyWebHook, receiveWebHook } = require('../Controller/WebHooks')
const router = express.Router()

router.get('/', verifyWebHook)
router.post('/', receiveWebHook)
module.exports = router
