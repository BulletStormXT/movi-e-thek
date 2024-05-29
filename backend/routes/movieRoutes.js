const express = require("express");
const movieController = require("../controllers/movieController");

const router = express.Router();

router.get("/movie/title/:title", movieController.getMovieDetails); // Simplified this route // ?title=batman or ?title=superman or ?title=ice age for single movie details
router.get("/movie/id/:imdb_id", movieController.getMovieDetailsById); // Simplified this route // ?id=tt1234567 or ?id=tt1234568 or ?id=tt1234569 for single movie details
router.get("/search/:search", movieController.searchMovies); // Simplified this route //? ?q=batman or ?q=superman or ?q=ice age

module.exports = router;
