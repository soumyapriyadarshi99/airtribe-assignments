const express = require("express");
const {
  createTheatre,
  getTheatres,
} = require("../controllers/TheatreController");
const theatreRoutes = express.Router();

theatreRoutes.post("/", createTheatre);
theatreRoutes.get("/", getTheatres);

module.exports = theatreRoutes;
