const sequelize = require("../config/db.config").sequelize;
const DataTypes = require("sequelize");

const Movie = sequelize.define("Movie", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  movieName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
// Call sync to create the table
sequelize
  .sync({ force: false }) // Set force to true to drop and re-create the table each time the application starts
  .then(() => {
    console.log("Movie table created successfully");
  })
  .catch((error) => {
    console.error(`Error creating Movie table: ${error}`);
  });

module.exports = { Movie };
