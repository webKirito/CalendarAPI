const Date = require('../schemas/Date')

const initialDate = id => {
  return { timeOfTheDay: id, events: [] }
}
const getArrayWithNewEvent = (arr, event) => {
  if (arr.length === 0) {
    return [{ ...event }]
  }
  const eventIsUnique = ![...arr].filter(evt => evt.time === event.time).length
  if (eventIsUnique) {
    return [...arr, { ...event }]
  } else {
    return [...arr]
  }
}

const addEventLogic = async ({ event }, params, res) => {
  let date =
    (await Date.findOne({ timeOfTheDay: params.id })) || initialDate(params.id)
  let data
  if (date.events.length) {
    data = await Date.findOneAndUpdate(
      { timeOfTheDay: date.timeOfTheDay },
      {
        $set: {
          events: getArrayWithNewEvent(date.events, event),
        },
      },
    )
  } else {
    const newDate = new Date({
      ...date,
      events: getArrayWithNewEvent(date.events, event),
    })
    data = await newDate.save()
  }
  res.send({ data })
}

exports.addEvent = ({ body, params }, res) => {
  addEventLogic(body, params, res)
}

const removeEventLogic = async (params, res) => {
  try {
    const date = await Date.findOne({ timeOfTheDay: params.id })
    const dayTime = +params.day
    const data = await Date.findOneAndUpdate(
      { timeOfTheDay: date.timeOfTheDay },
      {
        $set: {
          events: date.events.filter(event => event.time === dayTime),
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

exports.removeEvent = ({ params }, res) => {
  removeEventLogic(params, res)
}

const getEventsLogic = async (params, res) => {
  try {
    const data = (await Date.findOne({ timeOfTheDay: params.id })) || {
      events: [],
    }
    res.send({ data: data.events })
  } catch (e) {
    res.send({
      error: e.toString(),
    })
  }
}

exports.getEvents = ({ params }, res) => {
  getEventsLogic(params, res)
}

const getEventLogic = async (params, res) => {
  try {
    const data = (await Date.findOne({ timeOfTheDay: params.id })) || {}
    const dayTime = +params.day
    res.send({ data: data.events.find(event => event.time === dayTime) })
  } catch (e) {
    res.send({
      error: e.toString(),
    })
  }
}

exports.getEvent = ({ params }, res) => {
  getEventLogic(params, res)
}

const updateEventLogic = async (params, body, res) => {
  try {
    const date = await Date.findOne({ timeOfTheDay: params.id })
    const data = await Date.findOneAndUpdate(
      { timeOfTheDay: date.timeOfTheDay },
      {
        $set: {
          events: date.events.map(event =>
            event.time === body.time ? body : event,
          ),
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
