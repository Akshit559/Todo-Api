const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  //First step=> Token fetch from headers
  const token = req.header("x-api-key");

  //second step => Check if token exists
  if (!token) {
    return res.json({
      statusCode: 404,
      message: "Token not found, Authorization Denied",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.json({ statusCode: 401, message: "Token is not Valid" });
  }
};
