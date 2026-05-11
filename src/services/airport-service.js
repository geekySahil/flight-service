const { StatusCodes } = require("http-status-codes");
const { AirportRepository } = require("../repositories");
const { AppError } = require("../utils");

const airportRepository = new AirportRepository();

async function createAirport(data) {
  try {
    const airport = await airportRepository.create(data);
    return airport;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }

    throw new AppError(
      "Cannot create new airport object",
      StatusCodes.BAD_REQUEST
    );
  }
}

async function getAirports() {
  try {
    const airports = await airportRepository.getAll();
    return airports;
  } catch (error) {
    throw new AppError(
      "Cannot fetch data of all the airport.",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirport(id) {
  try {
    const airport = await airportRepository.get(id);
    return airport;
  } catch (error) {
    throw new AppError(
      "Not able to find an airport.",
      StatusCodes.NOT_FOUND
    );
  }
}

async function destroyAirport(id) {
  try {
    const response = await airportRepository.destroy(id);
    return response;
  } catch (error) {
    if(error.statusCode === StatusCodes.NOT_FOUND){
      throw new AppError(
      "The airport you want to delete is not present.",
      StatusCodes.NOT_FOUND
    );
    }

    throw new AppError("Cannot delete the airplane you requested.", StatusCodes.INTERNAL_SERVER_ERROR)
    
  }
}

async function updateAirport(id, data) {
  try {
    const response = await airportRepository.update(id, data);
    return response;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }

    throw new AppError("Not able to find the airport which you want to update.", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  createAirport,
  getAirport, 
  getAirports, 
  destroyAirport, 
  updateAirport
};
