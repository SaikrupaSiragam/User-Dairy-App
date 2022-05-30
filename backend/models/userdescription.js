'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class userdescription extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    userdescription.init({
        userid: DataTypes.STRING,
        description: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'userdescription',
    });
    return userdescription;
};