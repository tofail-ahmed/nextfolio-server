const express = require('express')
const app = express()
const port = 5000
const cors=require("cors")


app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello from Nextfolio server!1')
})

app.listen(port, () => {
  console.log(`nextfolio server listening on porttttt ${port}`)
})