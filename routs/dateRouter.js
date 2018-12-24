const express = require('express')
const router = express.Router()
const dateController = require('../controllers/dateController')

const ROUTS = {
  ADD_EVENT: '/date/:id',
  REMOVE_EVENT: '/date/:id/:day',
  CHANGE_EVENT: '/date/:id/:day',
  GET_EVENTS: '/date/:id',
  GET_EVENT: '/date/:id/:day',
}

router.post(ROUTS.ADD_EVENT, dateController.addEvent)
router.get(ROUTS.GET_EVENTS, dateController.getEvents)
router.get(ROUTS.GET_EVENT, dateController.getEvent)
router.put(ROUTS.CHANGE_EVENT, dateController.updateEvent)
router.delete(ROUTS.REMOVE_EVENT, dateController.removeEvent)

module.exports = router
