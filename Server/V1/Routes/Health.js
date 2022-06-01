const express = require('express')
const { checkHealth } = require('../Controller/Health')
const router = express.Router()

router.get('/', checkHealth)

module.exports = router
