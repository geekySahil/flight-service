const { StatusCodes } = require('http-status-codes')
const {AppError, ErrorResponse} = require('../utils')

const validateCreateRequest = (req, res, next) => {
    if(!req.body.name){
        ErrorResponse.message = 'Something went wrong while creating a city.'
        ErrorResponse.error = new AppError('Name field not found in the incoming request.', StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
    }
    next()
}

module.exports = {
    validateCreateRequest
}