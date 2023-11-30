const express = require("express");
const userController = express.Router();
const uuid = require("uuid"); //using this package to generate unique id for each user
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let userData = require("../utils/data/userData");
const emailValidation = require("../utils/helper/emailValidation");
const userValidation = require("../utils/helper/userValidation");
const jwtAuth = require("../middlewares/jwtAuth");

const secretKey = "API_NEWS_AGGREGATOR";

userController.post("/register", (req, res) => {
  try {
    const email = req?.body?.email;
    const password = req?.body?.password;
    const hashedPassword = bcrypt.hashSync(password, 10);
    if (!email || !password) {
      throw new Error("Email or Password Missing");
    }
    if (!emailValidation.isEmailValid(email?.trim())) {
      throw new Error("Invalid Email");
    }
    if (emailValidation.isEmailAlreadyExist(email?.trim())) {
      throw new Error("Email Already Exist");
    }
    const userId = uuid.v4();
    userData.push({
      email: email?.trim(),
      password: hashedPassword,
      id: userId,
      createdDate: new Date(),
      preferences: "default",
    });
    res.status(200).json({
      status: "success",
      message: "User Created Successfully",
      email: email?.trim(),
    });
  } catch (error) {
    res.status(401).send(error?.message);
  }
});

userController.post("/login", (req, res) => {
  try {
    const email = req?.body?.email;
    const password = req?.body?.password;
    if (!email || !password) {
      throw new Error("Email or Password Missing");
    }
    if (userValidation.isEmailPasswordMatchError(email, password?.trim())) {
      throw new Error("Email id and password does not match");
    }
    const isUserFound = userData?.find((user) => user?.email === email);
    const accessToken = jwt.sign(
      { id: isUserFound?.id, email: email },
      secretKey
    );
    res.status(200).json({
      status: "success",
      email: email,
      acessToken: accessToken,
    });
  } catch (error) {
    res.status(401).send(error?.message);
  }
});

userController.get("/preferences", jwtAuth, (req, res) => {
  try {
    if (req?.user) {
      const userId = req?.user;
      const user = userData?.find((user) => user?.id === userId);
      if (!user) {
        res.status(404).send("No User found");
      }
      const newsPrefered = user?.preferences;
      res.status(200).json(newsPrefered);
    } else {
      throw new Error(req?.message);
    }
  } catch (error) {
    res.status(403).send(error?.message);
  }
});

userController.put("/preferences", jwtAuth, (req, res) => {
  try {
    if (req?.user) {
      const userId = req?.user;
      const newPreference = req?.body?.preference;
      const userIndex = userData.findIndex((user) => user?.id === userId);
      if (!newPreference) {
        return res
          .status(400)
          .json({ status: "error", message: "Preference expected" });
      }
      if (userIndex === -1) {
        return res
          .status(404)
          .json({ status: "error", message: "No user found" });
      }
      userData[userIndex].preferences = newPreference;
      res
        .status(200)
        .json({ status: "success", message: "User preference updated" });
    } else {
      throw new Error(req?.message);
    }
  } catch (error) {
    res.status(403).send(error?.message);
  }
});

module.exports = userController;
