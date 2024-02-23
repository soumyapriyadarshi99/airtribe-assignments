import express, { Express, Request, Response } from "express";
const app: Express = express();
import bodyParser from "body-parser";
import cors from "cors";
import Database from "./config/Db.config";

const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

Database.getInstance();
// const connection = dbService.getConnection();

app.get("/", (req: Request, res: Response) => {
  res.send("Port 8000 is working fine");
});

app.listen(PORT, async () => {
  console.log(`running on ${PORT}`);
});
