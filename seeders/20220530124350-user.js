'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      name: 'Keerthan Kumar',
      age: 27,
      mobile: 897,
      email: 'keerthankumar@gmail.com',
      password: 'Keerthan@888',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Anuradha',
      age: 24,
      mobile: 564,
      email: 'anuradha234@gmail.com',
      password: 'Anuradhaa',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
