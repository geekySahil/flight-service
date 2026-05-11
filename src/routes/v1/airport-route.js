const express = require('express')
const { AirportMiddleware } = require('../../middlewares')
const { AirportController } = require('../../controllers')

const router = express.Router()


router.post('/',AirportMiddleware.validateCreateRequest, AirportController.createAirport)
router.get('/',  AirportController.getAirports)

router.get('/:id', AirportController.getAirport)


router.delete('/:id',  AirportController.destroyAirport)

router.patch('/:id',AirportMiddleware.validateCreateRequest,  AirportController.updateAirport)

module.exports = router