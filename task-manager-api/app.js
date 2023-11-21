const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const taskManagementController = require("./controllers/taskManagementController");

app.use(router);
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).send("App is running fine");
});

router.use("/taskmanagement/v1", taskManagementController);

const port = 5000;
app.listen(port, () => console.log(`App is running on port ${port}`));
