const request = require("supertest");
const express = require("express");
const movieRoute = require("../routes/movieRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api/movies", movieRoute);

describe("OMDb API Endpoints", () => {
  it("should fetch movie details", async () => {
    const movieTitle = "Inception";
    const res = await request(app).get(`/api/movies/movie/${movieTitle}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("Title", "Inception");
  });

  it("should search movies", async () => {
    const searchQuery = "Star Wars";
    const res = await request(app).get(`/api/movies/search?q=${searchQuery}`); // Updated to match the new route
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("Search");
    expect(res.body.Search.length).toBeGreaterThan(0);
  });

  it("should fetch movie details by ID", async () => {
    const imdbID = "tt1375666";
    const res = await request(app).get(`/api/movies/movie/id/${imdbID}`); // Updated to match the new route
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("imdbID", "tt1375666");
  });
});
