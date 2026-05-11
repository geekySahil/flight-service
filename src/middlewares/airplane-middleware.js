const { StatusCodes } = require('http-status-codes')
const {AppError, ErrorResponse} = require('../utils')

const validateCreateRequest = (req, res, next) => {
    if(!req.body.modelNumber){
        ErrorResponse.message = 'Something went wrong while creating an airplane.'
        ErrorResponse.error = new AppError('Model Number not found in the incoming request.', StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
    }
    next()

}

module.exports = {
    validateCreateRequest
}