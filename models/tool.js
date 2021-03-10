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
      Tool.belongsToMany(models.LocalHood, { foreignKey: "toolId" });
    }
  };
  Tool.init({
    toolName: DataTypes.STRING,
    toolBrand: DataTypes.STRING,
    category: DataTypes.STRING,
    details: DataTypes.STRING,
    lent: DataTypes.BOOLEAN,
    lentTo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tool',
  });
  return Tool;
};