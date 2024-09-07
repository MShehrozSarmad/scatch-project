const express = require("express");
const router = express.Router();
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.send("hy working!");
});

router.post("/register", async (req, res) => {
  try {
    let { fullname, email, password } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.send(err.message);
        else {
          const user = await userModel.create({ fullname, email, password });
          const token = jwt.sign({email, id: user._id}, 'secretkey');
          res.cookie("token", token);
          res.send('user created successfuly');
        }
      });
    });
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
