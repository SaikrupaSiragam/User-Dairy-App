'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usersdairy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  usersdairy.init({
    userid: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    date:DataTypes.DATEONLY,
    
  }, {
    sequelize,
    modelName: 'usersdairy',
  });
  return usersdairy;
};