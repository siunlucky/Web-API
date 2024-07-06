const express = require('express')
const router = express.Router()

const adminAuth = require('../controllers/v1/auth/adminAuth.controller')
const partnerAuth = require('../controllers/v1/auth/partnerAuth.controller')
const customerAuth = require('../controllers/v1/auth/customerAuth.controller')
const profileAuth = require('../controllers/v1/auth/profile.controller')
const { authMiddleware } = require('../middleware/auth.middleware')

router.use('/admin', adminAuth)
router.use('/partner', partnerAuth)
router.use('/customer', customerAuth)
router.use('/profile', authMiddleware, profileAuth)

module.exports = router