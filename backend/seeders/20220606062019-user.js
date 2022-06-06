'use strict';
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      name: 'Keerthan Kumar',
      age: 27,
      email: 'keerthankumar@gmail.com',
      password: bcrypt.hashSync('Keerthan@888', salt),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Anuradha',
      age: 24,
      email: 'anuradha234@gmail.com',
      password: bcrypt.hashSync('Anuradhaa', salt),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
