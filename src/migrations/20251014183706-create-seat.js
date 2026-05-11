'use strict';
const { ENUM } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */

const { Enums } = require('../utils/common');

const {BUISSNESS, ECONOMY, PREMIUM_ECONOMY, FIRST_CLASS} = Enums.seatType
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Seats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      airplaneId: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        references: {
          model: 'Airplanes', 
          key: 'id'
        }, 
        onDelete: 'CASCADE'
      },
      row: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      col: {
        type: Sequelize.STRING, 
        allowNull: false 
      },
      type: {
        type: Sequelize.ENUM(ECONOMY, PREMIUM_ECONOMY, FIRST_CLASS, BUISSNESS),
        allowNull: false, 
        defaultValue: ECONOMY
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Seats');
  }
};