const express = require("express");
const movieRouter = express.Router();
const { getMovies, createMovie } = require("../controllers/MovieController.Js");

movieRouter.get("/", getMovies);
movieRouter.post("/", createMovie);

module.exports = movieRouter;
