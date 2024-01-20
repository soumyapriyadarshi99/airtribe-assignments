const express = require("express");
const { createShow, getShows } = require("../controllers/ShowController");
const showRoutes = express.Router();

showRoutes.post("/", createShow);
showRoutes.get("/", getShows);

module.exports = showRoutes;
