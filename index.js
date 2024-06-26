const express = require('express')
const api = require('./app/routes/App.routes')

const app = express()
app.use(express.json())

app.use('/api/v1', api)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app