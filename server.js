const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const DB_URL =
  process.MONGODB_URL ||
  'mongodb://kirarito:kirarito1@ds243054.mlab.com:43054/calendar-db-v2'

mongoose.connect(
  DB_URL,
  { useNewUrlParser: true },
)

const db = mongoose.connection

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
)
app.disable('etag')
app.use(cors())

app.use('/api/', require('./routs/dateRouter'))

const INITIAL_PORT = process.env.PORT || 3001

//Routes

app.listen(INITIAL_PORT, () => {
  console.log(`Server runs on port ${INITIAL_PORT}`)
})
