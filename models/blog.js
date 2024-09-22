"use strict";
const { Model, ARRAY, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  blog.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      image: DataTypes.STRING,
      technologies: Sequelize.ARRAY(DataTypes.STRING),
    },
    {
      sequelize,
      modelName: "blog",
    }
  );
  return blog;
};
