const { sequelize } = require("../config/db.config");
const DataTypes = require("sequelize");

const Theatre = sequelize.define("Theatre", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  theatreName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize
  .sync({ force: false })
  .then(() => console.log("Synced Theatre table"))
  .catch((error) => console.log("Error in Theatre table"));

module.exports = { Theatre };
