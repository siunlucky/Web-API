const express = require("express");

const userRoleController = require("../../../controllers/v1/cms/userRole.controller")
const serviceController = require("../../../controllers/v1/cms/service.controller")
const { adminMiddleware } = require('../../../middleware/auth.middleware');

const router = express.Router();

router.use('/role', adminMiddleware, userRoleController);
router.use('/service', adminMiddleware, serviceController);

module.exports = router;    