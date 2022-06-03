'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usersdairies', [{
      userid: 2,
      description: 'A great day to be remembered',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userid: 1,
      description: 'Memorable day',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usersdairies', null, {});
  }
};
