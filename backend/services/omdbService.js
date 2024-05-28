const https = require("https");
require("dotenv").config();

const OMDB_API_KEY = process.env.OMDB_API_KEY;
const OMDB_API_URL = "https://www.omdbapi.com/";

function fetchFromOMDb(params) {
  return new Promise((resolve, reject) => {
    const query = new URLSearchParams({ ...params, apikey: OMDB_API_KEY });
    const url = `${OMDB_API_URL}?${query.toString()}`;

    https
      .get(url, (response) => {
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          resolve(JSON.parse(data));
        });
      })
      .on("error", (err) => {
        reject(new Error("Error fetching data from OMDb API"));
      });
  });
}

async function fetchMovieDetails(title) {
  return await fetchFromOMDb({ t: title });
}

async function fetchMoviesBySearch(search) {
  return await fetchFromOMDb({ s: search });
}

module.exports = {
  fetchMovieDetails,
  fetchMoviesBySearch,
};
