'use strict';
const {
  Model
} = require('sequelize');
const neighborhood = require('./neighborhood');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Tool, { foreignKey: "userId" });
      User.belongsToMany(models.Neighborhood,{
        through: "LocalHood",
        foreignKey: "userId",
        otherKey: "neighborhoodId"
        //^this fixed neighborhoodName for neighborhoodpage
      })
      User.hasMany(models.LocalHood, { 
        foreignKey: "userId",
 });
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};