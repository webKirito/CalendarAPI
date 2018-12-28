const Event = require('../schemas/Event')

const addEventLogic = async ({ event }, res) => {
  try {
    const newDate = new Event({
      ...event,
    })
    data = await newDate.save()
    res.send({ data })
  } catch (e) {
    res.send({ error: e.toString() })
  }
}

exports.addEvent = ({ body }, res) => {
  addEventLogic(body, res)
}

const removeEventLogic = async ({ id }, res) => {
  try {
    const data = await Event.remove({ _id: id })
    res.send({ statusCode: 204 })
  } catch (e) {
    res.send({
      error: e.toString(),
    })
  }
}

exports.removeEvent = ({ params }, res) => {
  removeEventLogic(params, res)
}

const parseDate = date => {
  const month = +date.split('_')[0]
  const year = +date.split('_')[1]
  return {
    month,
    year,
  }
}

const getEventsLogic = async ({ date }, res) => {
  try {
    const mask = parseDate(date)
    const data = await Event.find(mask)
    res.send({ data })
  } catch (e) {
    res.send({
      error: e.toString(),
    })
  }
}

exports.getEvents = ({ params }, res) => {
  getEventsLogic(params, res)
}

const getEventLogic = async ({ id }, res) => {
  try {
    const data = await Event.findOne({ _id: id })
    res.send({ data })
  } catch (e) {
    res.send({
      error: e.toString(),
    })
  }
}

exports.getEvent = ({ params }, res) => {
  getEventLogic(params, res)
}

const updateEventLogic = async ({ id }, body, res) => {
  try {
    const data = await Event.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          ...body,
        },
      },
    )
    res.send({ data })
  } catch (e) {
    res.send({
      error: e.toString(),
    })
  }
}

exports.updateEvent = ({ params, body }, res) => {
  updateEventLogic(params, body, res)
}
