// const db = require("../models/index");
// const { DataTypes } = require("sequelize");

// const users = db.sequelize.define(
//   "users",
//   console.log("inside user models"),
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     age:{
//       type: DataTypes.INTEGER,
//     },
//     mobile: {
//       type: DataTypes.INTEGER,
//     },
//     email: {
//       type: DataTypes.STRING,
//     },
//     password: {
//       type: DataTypes.STRING,
//     },
//     createdAt: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     updatedAt: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//   },
//   {
//     freezeTableName: true,
//     timestamps: false,
//   }
// );

// module.exports = users;



'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    mobile: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};
