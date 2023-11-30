const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

app.use(router);
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("App is working fine");
});

app.listen(PORT, () => {
  console.log(`APP is runnning on port ${PORT}`);
});
