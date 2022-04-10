const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.SQL_URI);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
  sequelize,
};
