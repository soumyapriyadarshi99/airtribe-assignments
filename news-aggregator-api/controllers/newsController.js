const express = require("express");
const newsController = express.Router();
const jwtAuth = require("../middlewares/jwtAuth");
const userData = require("../utils/data/userData");

newsController.get("/", jwtAuth, async (req, res) => {
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
      const newsData = await getNews(userPrefernce);
      res.status(200).json(newsData);
    } else {
      throw new Error(req?.message);
    }
  } catch (error) {
    res.status(403).send(error?.message);
  }
});

const getNews = async (preference) => {
  try {
    const data = await fetch(
      `https://newsapi.org/v2/everything?q=${preference}&apiKey=1a56cd138fe946a79e698b9422bf19a4`
    );

    return data.json();
  } catch (error) {
    console.log(error);
  }
};

module.exports = newsController;
