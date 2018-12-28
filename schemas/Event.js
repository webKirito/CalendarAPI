const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  participants: {
    type: String,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('event', EventSchema)
