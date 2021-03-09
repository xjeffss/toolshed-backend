'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tools', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      toolName: {
        type: Sequelize.STRING
      },
      toolBrand: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      details: {
        type: Sequelize.STRING
      },
      lent: {
        type: Sequelize.BOOLEAN
      },
      lentTo: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tools');
  }
};