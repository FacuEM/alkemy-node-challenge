const express = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");
const router = express.Router();

//register
router.post("/register", authController.register);

//login
router.post("/login", passport.authenticate("local"), authController.login);

//logout
router.post("/logout", authController.logout);

//verify that the user is logged in
router.get("/me", authController.me);

//error handler
router.use("/", authController.error);

module.exports = router;
