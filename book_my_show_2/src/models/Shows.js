const { sequelize } = require("../config/db.config");
const DataTypes = require("sequelize");
const { Theatre } = require("./Theatres");
const { Movie } = require("./Movies");

const Show = sequelize.define("Show", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  movieId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: Movie,
      key: "id",
    },
  },
  theatreId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: Theatre,
      key: "id",
    },
  },
  showDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  showTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Show.belongsTo(Theatre, { foreignKey: "theatreId" });
Show.belongsTo(Movie, { foreignKey: "movieId" });

sequelize
  .sync({ force: false })
  .then(() => console.log("Synced Show table"))
  .catch((error) => console.log("Error in Show table"));

module.exports = { Show };
