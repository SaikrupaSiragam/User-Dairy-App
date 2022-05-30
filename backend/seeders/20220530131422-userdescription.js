'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('userdiscription', [{
      userid: 2,
      description: 'A great day to be remembered',
      createdAt: new Date()
    }, {
      userid: 1,
      description: 'Memorable day',
      createdAt: new Date()
    }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('userdescription', null, {});
  }
};
