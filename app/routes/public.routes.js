const express = require('express')
const router = express.Router()

const userRole = require('../controllers/v1/public/userRole.controller')

router.use('/role', userRole)

module.exports = router