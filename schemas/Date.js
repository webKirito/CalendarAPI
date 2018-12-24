const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DateSchema = new Schema({
  events: {
    type: Array,
    required: true,
  },
  timeOfTheDay: {
    type: String,
  },
})

module.exports = mongoose.model('dates', DateSchema)
