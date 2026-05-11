const { where } = require("sequelize");
const { Logger } = require("../config");
const { AppError } = require("../utils");
const { StatusCodes } = require("http-status-codes");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const response = await this.model.create(data);
    return response;
  }

  async destroy(data) {
    const response = await this.model.destroy({
      where: {
        id: data,
      },
    });

    if (!response) {
      throw new AppError(
        "Not able to find the document you requested to delete.",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  }

  async get(data) {
      const response = await this.model.findByPk(data);

      if (!response) {
        throw new AppError(
          "Not able to find the document you requested.",
          StatusCodes.NOT_FOUND
        );
      }
      return response;
  }

  async getAll() {
      const response = await this.model.findAll();
      return response;
  }

  async update(id, data) {
    const [rowsUpdated] = await this.model.update(data, {
      where: {
        id: id,
      },
    });

    if (!rowsUpdated) {
      throw new AppError(
        "Not able to find the resource you want to update.",
        StatusCodes.NOT_FOUND
      );
    }

    return rowsUpdated;
  }
}

module.exports = CrudRepository;
