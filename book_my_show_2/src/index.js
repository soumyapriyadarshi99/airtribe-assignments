const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { sequelize, connectToDb } = require("./config/db.config");
const movieRouter = require("./routes/MovieRoutes");

const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/movies", movieRouter);

app.get("/", (req, res) => {
  res.send("Port 8000 is working fine");
});

app.listen(PORT, async () => {
  await connectToDb();
  console.log(`App is running on port ${PORT}`);
});
