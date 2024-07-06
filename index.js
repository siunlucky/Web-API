const express = require('express')
const errorHandler = require('./app/utils/errorHandler')
const dotenv = require("dotenv");
dotenv.config();

const api = require('./app/routes/App.routes')

const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public')) // for serving static files

app.use('/api/v1', api)

app.use(errorHandler)

const port = process.env.PORT || 3000
const host = process.env.HOST || "http://localhost:"

app.listen(port, () => {
  console.log(`Example app listening on port ${host}${port}`)
})

module.exports = app