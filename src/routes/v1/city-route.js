const express = require('express')
const { CityMiddleware } = require('../../middlewares')
const { CityController } = require('../../controllers')

const router = express.Router()


router.post('/',  CityController.createCity)

router.delete('/:id', CityController.destroyCity)

router.patch('/:id', CityController.updateCity)

module.exports = router