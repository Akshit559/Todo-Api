// Post Route
// User Signup
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    var user = await User.findOne({ email });
    if (user) {
      return res.json({ statusCode: 400, message: "User Already Exists!" });
    }
    user = new User({ name, email, password });
    //Password Hashing
    //step 1 of PW Hashing => Salt generation
    const salt = await bcrypt.genSalt(10);
    //step 2 of PW Hashing => Modifying the DB password
    user.password = await bcrypt.hash(password, salt);

    //Save User to DB
    await user.save();
    //Token Generation
    // Step 1 => Creation of Payload
    const payload = {
      user: {
        id: user.id,
      },
    };
    // Step 2 => Token Generation
    jwt.sign(
      payload,
      process.env.jwtSecret,
      {
        expiresIn: 36000000000000,
      },
      (err, token) => {
        if (err) throw err;
        return res.json({
          statusCode: 200,
          message: "User Registered",
          user: user,
          token: token,
        });
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

//Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    var user = await User.findOne({ email });
    if (!user) {
      return res.json({ statusCode: 404, message: "User Does not Exists!" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({ status: 401, message: "Password Doesnot match" });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.jwtSecret,
      {
        expiresIn: 36000000000000,
      },
      (err, token) => {
        if (err) throw err;
        return res.json({
          statusCode: 200,
          message: "User Logged in",
          user: user,
          token: token,
        });
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};
