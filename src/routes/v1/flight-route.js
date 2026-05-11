const express = require('express')
const { FlightMiddleware } = require('../../middlewares')
const { FlightController } = require('../../controllers')

const router = express.Router()


router.post('/',  FlightMiddleware.validateCreateRequest, FlightController.createFlight)

router.patch('/:id/seats',FlightMiddleware.validateUpdateSeatRequest, FlightController.updateSeats)

router.get('/', FlightController.getAllFlights)

router.get('/:id', FlightController.getFlight)



module.exports = router