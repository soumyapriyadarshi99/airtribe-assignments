const express = require("express");
const movieRouter = express.Router();
const { Movie } = require("../models/Movies");
const { getMovies } = require("../controllers/MovieController.Js");
const { createMovie } = require("../controllers/MovieController.Js");

movieRouter.get("/", getMovies);
movieRouter.post("/", createMovie);

module.exports = movieRouter;
