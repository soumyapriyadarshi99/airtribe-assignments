const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const userController = require("./controllers/userController.js");
const userData = require("./utils/data/userData.js");
const newsController = require("./controllers/newsController.js");

app.use(router);
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const PORT = 5000;

//to check all the users present in db
app.get("/", (req, res) => {
  res.status(201).json(userData);
});

router.use("/user", userController);
router.use("/news", newsController);

app.listen(PORT, () => {
  console.log(`APP is runnning on port ${PORT}`);
});
