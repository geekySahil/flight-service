const { StatusCodes } = require("http-status-codes");
const { AppError, ErrorResponse } = require("../utils");

const validateCreateRequest = (req, res, next) => {
  if (!req.body.flightNumber) {
    ErrorResponse.message = "Something went wrong while creating a flight.";
    ErrorResponse.error = new AppError(
      "flightNumber field not found in the incoming request.",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.airplaneId) {
    ErrorResponse.message = "Something went wrong while creating a flight.";
    ErrorResponse.error = new AppError(
      "airplaneId field not found in the incoming request.",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.departureAirportId) {
    ErrorResponse.message = "Something went wrong while creating a flight.";
    ErrorResponse.error = new AppError(
      "departureAirportId field not found in the incoming request.",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.arrivalAirportId) {
    ErrorResponse.message = "Something went wrong while creating a flight.";
    ErrorResponse.error = new AppError(
      "arrivalAirportId field not found in the incoming request.",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.arrivalTime) {
    ErrorResponse.message = "Something went wrong while creating a flight.";
    ErrorResponse.error = new AppError(
      "arrivalTime field not found in the incoming request.",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.departureTime) {
    ErrorResponse.message = "Something went wrong while creating a flight.";
    ErrorResponse.error = new AppError(
      "departureTime field not found in the incoming request.",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.price) {
    ErrorResponse.message = "Something went wrong while creating a flight.";
    ErrorResponse.error = new AppError(
      "price field not found in the incoming request.",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.totalSeats) {
    ErrorResponse.message = "Something went wrong while creating a flight.";
    ErrorResponse.error = new AppError(
      "totalSeats field not found in the incoming request.",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
};

const validateUpdateSeatRequest = (req, res, next) => {
  console.log('validate SEAT.................', req.params?.id)
   if (!req.params?.id) {
    ErrorResponse.message = "Something went wrong while updating a seats.";
    ErrorResponse.error = new AppError(
      "flightId field not found in the incoming request.",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

   if (!req.body?.seats) {
    ErrorResponse.message = "Something went wrong while updating a seats.";
    ErrorResponse.error = new AppError(
      "seats field not found in the incoming request.",
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next()
}

module.exports = {
  validateCreateRequest,
  validateUpdateSeatRequest
};
