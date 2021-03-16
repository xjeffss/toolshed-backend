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
      // LocalHood.hasMany(models.Tool, { foreignKey: "toolId" });
      // LocalHood.hasMany(models.User, { foreignKey: "userId" });
      LocalHood.belongsTo(models.Neighborhood, { 
        through: "Neighborhood",
        foreignKey: "neighborhoodId",
        otherKey: "userId",
        otherKey: "toolId" });
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