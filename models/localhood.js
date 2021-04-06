'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LocalHood extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      LocalHood.hasMany(models.Tool, { foreignKey: "id" });
      //^critical to tools showing up on shed page
      
      LocalHood.belongsTo(models.Neighborhood, { 
        through: "LocalHood",
        foreignKey: "neighborhoodId",
        otherKey: "userId",
        otherKey: "toolId" })
        // ^critical to shed printing correctly
      LocalHood.hasMany(models.User,{
        foreignKey: "id",
      } )
       
    } 

  };
  LocalHood.init({
    neighborhoodId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    toolId: DataTypes.INTEGER,
    NeighborhoodId: DataTypes.INTEGER
    
  }, {
    sequelize,
    modelName: 'LocalHood',
  });
  return LocalHood;
};