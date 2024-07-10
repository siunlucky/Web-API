const express = require("express");

const adminAuthController = require("../../../controllers/v1/auth/adminAuth.controller")
const partnerAuthController = require("../../../controllers/v1/auth/partnerAuth.controller")
const customerAuthController = require("../../../controllers/v1/auth/customerAuth.controller")
const profileAuthController = require("../../../controllers/v1/auth/profile.controller")

const { authMiddleware } = require('../../../middleware/auth.middleware')

const router = express.Router();

router.use('/admin', adminAuthController)
router.use('/partner', partnerAuthController)
router.use('/customer', customerAuthController)

router.use('/profile', authMiddleware, profileAuthController)

module.exports = router;