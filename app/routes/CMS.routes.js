const express = require('express')
const router = express.Router()

const userRole = require('../controllers/v1/cms/userRole.controller')
const { adminMiddleware } = require('../middleware/auth.middleware')

router.use('/role', adminMiddleware, userRole)

module.exports = router