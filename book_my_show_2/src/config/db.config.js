const { Sequelize } = require("sequelize");
// module.exports = {

const sequelize = new Sequelize("book_my_show_2", "root", "12345678", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected succesfully");
  } catch (error) {
    console.log(`error in db connection ${error}`);
  }
};

module.exports = { sequelize, connectToDb };
