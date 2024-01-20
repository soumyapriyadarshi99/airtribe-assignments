const { Show } = require("../models/Shows");

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
    const shows = await Show.findAll();
    res.status(200).send(shows);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

module.exports = { createShow, getShows };
