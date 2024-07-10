const express = require("express");

const userRoleController = require("../../../controllers/v1/public/userRole.controller");
const serviceController = require("../../../controllers/v1/public/service.controller");

const router = express.Router();

router.use('/role', userRoleController);
router.use('/service', serviceController);

module.exports = router;