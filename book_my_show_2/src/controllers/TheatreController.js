const { Theatre } = require("../models/Theatres");

const createTheatre = async (req, res) => {
  try {
    const { theatreName, location } = req?.body;
    const theatre = Theatre.build({
      theatreName: theatreName,
      location: location,
    });
    const createdTheatre = await theatre.save();
    res.status(201).json(createdTheatre);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const getTheatres = async (req, res) => {
  try {
    const theatres = await Theatre.findAll();
    res.status(200).json(theatres);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

module.exports = { createTheatre, getTheatres };
