'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // adding foriegn key constraint to link city to airport via cityId.
    await queryInterface.addConstraint('Airports', {
      type: 'foreign key', 
      name: 'city_fkey_constraint', 
      fields: ['cityId'], 
      references: {
        table: 'Cities', 
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })

    
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.removeConstraint('Airports', 'city_fkey_constraint')
  }
};



