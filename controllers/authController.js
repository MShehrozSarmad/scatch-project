const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    let { fullname, email, password } = req.body;

    const usr = await userModel.findOne({ email });
    if (usr)
      return res
        .status(401)
        .send("you already have an account, try logging in");

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.send(err.message);
        else {
          const user = await userModel.create({ fullname, email, password: hash });
          res.cookie("token", generateToken(user));
          res.send("user created successfuly");
        }
      });
    });
  } catch (error) {
    res.send(error.message);
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) return res.send("user not found");
  bcrypt.compare(password, user.password, (err, result) => {
    if(result){
        res.cookie('token', generateToken(user));
        // res.send('you are logged in ✅');
        res.redirect('/shop');
    }else{
        res.send('invalid cridentials ❌');
    }
  });
};

module.exports.logout = (req, res) => {
    res.cookie("token", '');
    res.redirect('/');
}