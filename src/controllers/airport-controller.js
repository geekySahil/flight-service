const { StatusCodes } = require("http-status-codes");
const { AirportService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils");

async function createAirport(req, res) {
  try {
    const airport = await AirportService.createAirport({
      name: req.body.name,
      code: req.body.code,
      address: req.body.address,
      cityId: req.body.cityId,
    });

    SuccessResponse.data = airport;

    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error.message = error.message;
    ErrorResponse.error.statusCode = error.statusCode;
    res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAirports(req, res) {
  try {
    const airports = await AirportService.getAirports();

    SuccessResponse.data = airports;

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error.message = error.message;
    ErrorResponse.error.statusCode = error.statusCode;
    res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAirport(req, res) {
  try {
    const airport = await AirportService.getAirport(req.params.id);

    SuccessResponse.data = airport;

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error.message = error.message;
    ErrorResponse.error.statusCode = error.statusCode;
    res.status(error.statusCode).json(ErrorResponse);
  }
}

async function destroyAirport(req, res) {
  try {
    const response = await AirportService.destroyAirport(req.params.id);

    SuccessResponse.data = response;

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error.message = error.message;
    ErrorResponse.error.statusCode = error.statusCode;
    res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateAirport(req, res) {
  try {
    const response = await AirportService.updateAirport(req.params.id, {
      name: req.body.name,
      code: req.body.code,
      address: req.body.address,
      cityId: req.body.cityId,
    });

    SuccessResponse.data = response;

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log(error.message, "ERROR MESSAGE");
    ErrorResponse.error.message = error.message;
    ErrorResponse.error.statusCode = error.statusCode;
    res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createAirport, 
  getAirport, 
  getAirports, 
  destroyAirport, 
  updateAirport
};
