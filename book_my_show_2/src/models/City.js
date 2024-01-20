const sequelize = require("../config/db.config").sequelize;
const DataTypes = require("sequelize");

const City = sequelize.define("City", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  cityName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pincodr: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
// Call sync to create the table
sequelize
  .sync({ force: false }) // Set force to true to drop and re-create the table each time the application starts
  .then(() => {
    console.log("City table created successfully");
  })
  .catch((error) => {
    console.error(`Error creating City table: ${error}`);
  });

module.exports = { City };
