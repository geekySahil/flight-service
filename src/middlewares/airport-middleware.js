const { StatusCodes } = require('http-status-codes')
const {AppError, ErrorResponse} = require('../utils')

const validateCreateRequest = (req, res, next) => {
    if(!req.body.name){
        ErrorResponse.message = 'Something went wrong while creating an airport.'
        ErrorResponse.error = new AppError('Airport name not found in the incoming request.', StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
    }
    if(!req.body.code){
        ErrorResponse.message = 'Something went wrong while creating an airport.'
        ErrorResponse.error = new AppError('Airport code not found in the incoming request.', StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
    }
    if(!req.body.cityId){
        ErrorResponse.message = 'Something went wrong while creating an airport.'
        ErrorResponse.error = new AppError('cityId not found in the incoming request.', StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
    }
    next()

}

module.exports = {
    validateCreateRequest
}