const express = require("express");
const newsController = express.Router();
const jwtAuth = require("../middlewares/jwtAuth");
const userData = require("../utils/data/userData");

newsController.get("/", jwtAuth, (req, res) => {
  try {
    if (req?.user) {
      const userId = req?.user;
      const userIndex = userData.findIndex((user) => user?.id === userId);
      if (userIndex === -1) {
        return res
          .status(404)
          .json({ status: "error", message: "No user found" });
      }
      const userPrefernce = userData?.[userIndex]?.preferences;
      res.status(200).json(userPrefernce);
    } else {
      throw new Error(req?.message);
    }
  } catch (error) {
    res.status(403).send(error?.message);
  }
});

module.exports = newsController;
