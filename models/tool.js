'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tool extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tool.belongsTo(models.User, { foreignKey: "userId" });
      // Tool.belongsTo(models.LocalHood, {
      //   through: "Neighborhood",
      //   foreignKey: "toolId"
      // })
      Tool.hasMany(models.LocalHood, { foreignKey: "toolId" });
      Tool.belongsToMany(models.Neighborhood,{
        through: "LocalHood",
        foreignKey: "toolId",
        otherKey: "neighborhoodId",
        otherKey:"userId"} )

    }
  };
  Tool.init({
    toolName: DataTypes.STRING,
    toolBrand: DataTypes.STRING,
    category: DataTypes.STRING,
    details: DataTypes.STRING,
    lent: DataTypes.BOOLEAN,
    lentTo: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tool',
  });
  return Tool;
};