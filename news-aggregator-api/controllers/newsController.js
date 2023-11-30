const express = require("express");
const newsController = express.Router();

newsController.get("/", (req, res) => {
  try {
    res.status(200).send("sent news");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = newsController;
