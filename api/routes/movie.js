const express = require("express");
const movieController = require("../controllers/movieController");
const router = express.Router();

// fetch movies
router.get("/", movieController.fetchMovies);
// add movie
router.post("/add", movieController.addMovie);
// edit movie
router.put("/edit/:id", movieController.editMovie);
// remove movie
router.delete("/remove/:id", movieController.removeMovie);
// fetch movie
router.get("/details/:id", movieController.fetchMovie);
// fetch by title
router.get("/search", movieController.fetchMovieByTitle);

module.exports = router;
