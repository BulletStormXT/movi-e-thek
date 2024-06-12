import React, { useState, useEffect } from "react";
import debounce from "lodash.debounce";

const UserDashboard = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const debouncedFetchMovies = debounce(async (query) => {
    if (query) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/products?search=${query}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    } else {
      setMovies([]);
    }
  }, 500);

  useEffect(() => {
    debouncedFetchMovies(search);
    return () => {
      debouncedFetchMovies.cancel();
    };
  }, [search]);

  return (
    <div className="udash">
      <h1 style={{ textAlign: "center" }}>User Dashboard</h1>
      <input
        type="text"
        placeholder="Search Movies"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="udash-search">
        {movies.map(
          (movie) =>
            (movie.name.toLowerCase().includes(search.toLowerCase()) ||
              movie.category.toLowerCase().includes(search.toLowerCase())) && (
              <div className="udash-res-cont" key={movie._id}>
                <div className="udash-res">
                  <h3>{movie.name}</h3>
                  <img src={movie.image} alt={movie.name} />
                  <p>{movie.description}</p>
                  <p>Category: {movie.category}</p>
                  <p>Price: €{movie.price}</p>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
