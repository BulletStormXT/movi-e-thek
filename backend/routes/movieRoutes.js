const express = require("express");
const movieController = require("../controllers/movieController");

const router = express.Router();

router.get("/movie/:title", movieController.getMovieDetails);
router.get("/search", movieController.searchMovies); // Simplified this route

module.exports = router;
