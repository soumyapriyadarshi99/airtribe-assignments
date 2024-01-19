const { Movie } = require("../models/Movies");

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.status(200).json(movies);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

const createMovie = async (req, res) => {
  try {
    const { movieName, language } = req?.body;
    const movie = Movie.build({
      movieName: movieName,
      language: language,
    });
    const savedMovie = await movie.save();
    res.status(201).send(savedMovie);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

module.exports = { getMovies, createMovie };
