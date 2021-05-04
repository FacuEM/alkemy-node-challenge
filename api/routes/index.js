const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const characterRoutes = require("./character");
const movieRoutes = require("./movie");

router.use("/auth", authRoutes);
router.use("/character", characterRoutes);
router.use("/movie", movieRoutes);

module.exports = router;
