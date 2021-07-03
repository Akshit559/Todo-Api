const userController = require("../controllers/userController");
const router = require("express").Router();

// Post Route
// User Signup
router.post("/register", userController.signup);
router.post("/login", userController.login);
module.exports = router;
