const { sequelize } = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const Goal = sequelize.define("goal", {
  text: {
    type: DataTypes.STRING,
    require: true,
  },
});

module.exports = Goal;
