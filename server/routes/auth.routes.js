const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login.controller");
const signupController = require("../controllers/signup.controller");

router.post("/auth/login", loginController);
router.post("/auth/signup", signupController);


module.exports = router;
