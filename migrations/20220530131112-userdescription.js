'use strict';

module.exports = {
 async up (queryInterface, Sequelize)  {
    await queryInterface.createTable('userdescription', {
      userid: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        },
        allowNull: false
      },
      description: Sequelize.DataTypes.Text,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  async down (queryInterface, Sequelize)  {
    await queryInterface.dropTable('userdescription');
  }
}