'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usercredentials', [{
      userid: 1,
      platform: 'flipkart',
      email: 'keerthankumar@gmail.com',
      password: 'Keerthan@888',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userid: 2,
      platform: 'amazon',
      email: 'anuradha234@gmail.com',
      password: 'Anuradhaa',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userid: 2,
      platform: 'flipkart',
      email: 'anuradha234@gmail.com',
      password: 'Anuradha121',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usercredentials', null, {});
  }
};
