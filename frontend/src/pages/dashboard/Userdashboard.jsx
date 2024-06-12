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
    <div>
      <h1 style={{ textAlign: "center" }}>User Dashboard</h1>
      <input
        type="text"
        placeholder="Search Movies"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        {movies.map(
          (movie) =>
            (movie.name.toLowerCase().includes(search.toLowerCase()) ||
              movie.category.toLowerCase().includes(search.toLowerCase())) && (
              <div key={movie._id}>
                <h3>{movie.name}</h3>
                <p>{movie.description}</p>
                <p>Price: €{movie.price}</p>
                <p>Category: {movie.category}</p>
                <img src={movie.image} alt={movie.name} />
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
