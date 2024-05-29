const omdbService = require("../services/omdbService");

async function getMovieDetails(req, res) {
  try {
    const title = req.params.title;
    const movieDetails = await omdbService.fetchMovieDetails(title);
    res.json(movieDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function searchMovies(req, res) {
  try {
    const search = req.query.q;
    const movies = await omdbService.fetchMoviesBySearch(search);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getMovieDetailsById(req, res) {
  try {
    const imdb_id = req.params.imdb_id;
    const movieDetails = await omdbService.fetchMovieDetailsById(imdb_id);
    res.json(movieDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getMovieDetails,
  searchMovies,
  getMovieDetailsById,
};
