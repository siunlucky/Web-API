const express = require('express')

const cmsRoutes = require("./CMS.routes")
const authRoutes = require("./auth.routes")

const router = express.Router()

router.get('/', (req, res) => {
  res.send('App Router')
})

router.use('/cms', cmsRoutes)
router.use('/auth', authRoutes)


module.exports = router