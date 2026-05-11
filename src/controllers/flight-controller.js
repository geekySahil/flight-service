const { StatusCodes } = require("http-status-codes");
const { FlightService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils");

async function createFlight(req, res) {
  try {
    const flight = await FlightService.createFlight({
      flightNumber: req.body.flightNumber,
      airplaneId: req.body.airplaneId,
      departureAirportId: req.body.departureAirportId,
      arrivalAirportId: req.body.arrivalAirportId,
      arrivalTime: req.body.arrivalTime,
      departureTime: req.body.departureTime,
      price: req.body.price,
      boardingGate: req.body.boardingGate,
      totalSeats: req.body.totalSeats,
    });

    SuccessResponse.data = flight;

    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error.message = error.message;
    ErrorResponse.error.statusCode = error.statusCode;
    res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAllFlights(req, res) {
  // console.log('get it ', req.query)
  try {
    const flights = await FlightService.getAllFlights(req.query);
    SuccessResponse.data = flights;

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error.message = error.message;
    ErrorResponse.error.statusCode = error.statusCode;
    res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getFlight(req, res) {
  try {
    const flight = await FlightService.getFlight(req.params.id);
    SuccessResponse.data = flight;

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error.message = error.message;
    ErrorResponse.error.statusCode = error.statusCode;
    res.status(error.statusCode).json(ErrorResponse);
  }
}


async function updateSeats(req, res) {
  try {
    const response = await FlightService.updateSeats({
      flightId : req.params.id, 
      seats: req.body.seats, 
      dec: req.body.dec
    });




    SuccessResponse.data = response;

    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error.message = error.message;
    ErrorResponse.error.statusCode = error.statusCode;
    res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createFlight,
  getAllFlights,
  getFlight,
  updateSeats
};
