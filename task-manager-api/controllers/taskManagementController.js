const express = require("express");
const taskmanagementRouter = express.Router();
const userData = require("../utils/data/useData");
const uuid = require("uuid");

//create a task
taskmanagementRouter.post("/tasks", (req, res) => {
  try {
    const body = req?.body;
    const finalBody = { ...body, id: uuid.v4(), createdDate: new Date() };
    userData?.push(finalBody);
    res.status(201).send(finalBody);
  } catch (error) {
    res.status(404).send(error);
  }
});

//get all tasks
taskmanagementRouter.get("/tasks", (req, res) => {
  try {
    res.status(200).json(userData);
  } catch (error) {
    res.status(404).send(error);
  }
});

//get tasks by id
taskmanagementRouter.get("/tasks/:id", (req, res) => {
  try {
    const id = req?.params?.id;
    const task = userData?.find((item) => item?.id === id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).send("User Not Found");
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

//edit a task
taskmanagementRouter.put("/tasks/:id", (req, res) => {
  try {
    const id = req?.params?.id;
    const body = req?.body;
    const index = userData?.findIndex((item) => item?.id === id);
    if (index !== -1) {
      userData[index] = { ...userData[index], ...body };
      res.status(200).send("User Updated Successfully");
    } else {
      res.status(404).send("User Not Found");
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

//delete a task
taskmanagementRouter.delete("/tasks/:id", (req, res) => {
  try {
    const id = req?.params?.id;
    const task = userData?.find((item) => item?.id === id);
    if (task) {
      const newUserData = userData?.filter((item) => item?.id == id);
      console.log(newUserData, id, "hello");
      userData = newUserData;
      res.status(200).send("User Deleted");
    } else {
      res.status(404).send("User Not Found");
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = taskmanagementRouter;
