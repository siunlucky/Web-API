const app = require("./app/app")

const port = process.env.PORT || 3000
const host = process.env.HOST || "http://localhost:"

app.listen(port, () => {
  console.log(`Example app listening on port ${host}${port}`)
})