const express = require('express')
const router = express.Router()
const eventController = require('../controllers/eventController')

const ROUTS = {
  ADD_EVENT: '/event',
  REMOVE_EVENT: '/event/:id',
  CHANGE_EVENT: '/event/:id',
  GET_EVENTS: '/events/:date',
  GET_EVENT: '/event/:id',
}

router.post(ROUTS.ADD_EVENT, eventController.addEvent)
router.get(ROUTS.GET_EVENTS, eventController.getEvents)
router.get(ROUTS.GET_EVENT, eventController.getEvent)
router.put(ROUTS.CHANGE_EVENT, eventController.updateEvent)
router.delete(ROUTS.REMOVE_EVENT, eventController.removeEvent)

module.exports = router
