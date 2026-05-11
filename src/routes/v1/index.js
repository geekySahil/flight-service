const express = require('express')
const airplaneRoute = require('./airplane-route')
const cityRoute = require('./city-route')
const airportRoute = require('./airport-route')
const flightRoute = require('./flight-route')


const router = express.Router()

router.use('/airplane', airplaneRoute)
router.use('/cities', cityRoute)
router.use('/airport', airportRoute)
router.use('/flights', flightRoute)

module.exports = router