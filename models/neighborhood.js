'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Neighborhood extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Neighborhood.hasMany(models.User, { 
        foreignKey: "id" });
    }
  };
  Neighborhood.init({
    neighborhoodName: DataTypes.STRING,
    neighborhoodPasscode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Neighborhood',
  });
  return Neighborhood;
};