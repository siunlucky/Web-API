const express = require("express");

const authRoutes = require("./auth/auth.routes");
const cmsRoutes = require("./cms/cms.routes");
const publicRoutes = require("./public/public.routes");

const router = express.Router();

router.use("/auth", authRoutes)
router.use("/cms", cmsRoutes)
router.use("/public", publicRoutes)

module.exports = router;