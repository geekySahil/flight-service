const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const { compareTime, AppError } = require("../utils");
const { Op } = require("sequelize");

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    const arr = data.arrivalTime.replace(" ", "T");
    const dep = data.departureTime.replace(" ", "T");

    const validTime = compareTime(arr, dep);

    if (!validTime) {
      throw new AppError(
        "Arrival Timing should always be greater than departure timings",
        StatusCodes.BAD_REQUEST
      );
    }
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }

    throw new AppError(
      "Cannot create new flight object",
      StatusCodes.BAD_REQUEST
    );
  }
}

async function getAllFlights(query) {
  let customFilters = {};
  let sortFilters = [];
  const startingTripTime = " 00:00:00";
  const endingTripTime = " 23:59:00";

  if (query.trips) {
    const [departureAirportId, arrivalAirportId] = query.trips.split("-");
    customFilters.departureAirportId = departureAirportId;
    customFilters.arrivalAirportId = arrivalAirportId;
    // TODO: check whethter departure and arrival airports are different
  }

  if (query.price) {
    const [minPrice, maxPrice] = query.price.split("-");
    customFilters.price = {
      [Op.between]: [minPrice, maxPrice === undefined ? 20000 : maxPrice],
    };
  }

  if (query.travellers) {
    customFilters.totalSeats = {
      [Op.gte]: query.travellers,
    };
  }

  if (query.tripDate) {
    customFilters.departureTime = {
      [Op.between]: [
        query.tripDate + startingTripTime,
        query.tripDate + endingTripTime,
      ],
    };
  }

  if (query.sort) {
    const params = query.sort.split(",");
    const sortParams = params.map((param) => param.split("_"));
    sortFilters = sortParams;
  }
  try {
    // console.log(customFilters, "----", sortFilters);
    const flights = await flightRepository.getAllFlights(
      customFilters,
      sortFilters
    );
    // console.log(flights, "FLIGHTS");
    return flights;
  } catch (error) {
    throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getFlight(id) {
  try {
    const flight = await flightRepository.get(id);
    return flight;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The flight you requested is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "cannot fetch the flight details you have requested",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateSeats(data) {
  try {
    const response = await flightRepository.updateRemainingSeats(
      data.flightId,
      data.seats,
      data.dec
    );


    return response;
  } catch (error) {
    throw new AppError(
      "Cannot update the data of the flight",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createFlight,
  getAllFlights,
  getFlight,
  updateSeats,
};
