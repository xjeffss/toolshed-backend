'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Jeff',
        lastName: 'Elmore',
        username: 'jeffelmore',
        password: 'ranchero',
        email: 'jeff.elmore@mchsi.com'
    }], {});
 
  },

  down: async (queryInterface, Sequelize) => {

     await queryInterface.bulkDelete('Users', null, {});
     
  }
};
