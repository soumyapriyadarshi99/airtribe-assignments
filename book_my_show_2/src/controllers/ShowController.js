const { Sequelize } = require("sequelize");
const { Show } = require("../models/Shows");
const { Movie } = require("../models/Movies");

const createShow = async (req, res) => {
  try {
    const { movieId, theatreId, showDate, showTime } = req?.body;
    const formattedShowDate = new Date(showDate);
    const show = Show.build({
      movieId: movieId,
      theatreId: theatreId,
      showDate: formattedShowDate,
      showTime: showTime,
    });
    const savedShow = await show.save();
    res.status(201).json(savedShow);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

const getShows = async (req, res) => {
  try {
    let filters = {};
    let theatreId = req?.query?.theatreId;
    const requestedDate = req?.query?.showDate;
    if (theatreId) {
      filters = { ...filters, theatreId: theatreId };
    }
    if (requestedDate) {
      let formattedDate = new Date(requestedDate);
      filters = { ...filters, showDate: formattedDate };
    } else {
      const today = new Date();
      const next6day = new Date();
      next6day.setDate(new Date().getDate() + 6);
      today.setHours(0, 0, 0, 0);
      next6day.setHours(23, 59, 59, 999);
      filters = {
        ...filters,
        showDate: { [Sequelize.Op.between]: [today, next6day] },
      };
    }
    const shows = await Show.findAll({
      where: filters,
      include: [{ model: Movie, attributes: ["movieName", "language"] }],
    });

    res.status(200).send(shows);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

module.exports = { createShow, getShows };
