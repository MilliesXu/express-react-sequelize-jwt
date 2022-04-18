const { sequelize } = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");
const User = require("./userModel");

const Goal = sequelize.define("goal", {
  text: {
    type: DataTypes.STRING,
    require: true,
  },
});

Goal.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = Goal;
