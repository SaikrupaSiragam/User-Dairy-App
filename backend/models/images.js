'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      images.hasMany(models.usersdairy, {foreignKey:'id' , onDelete: 'cascade' });
    }
  }
  images.init({
    usersdairy_id: DataTypes.INTEGER,
    image: DataTypes.ARRAY(DataTypes.TEXT)
  }, {
    sequelize,
    modelName: 'images',
  });
  return images;
};