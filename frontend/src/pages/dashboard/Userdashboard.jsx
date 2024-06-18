/* import React, { useState, useEffect } from "react";
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
                  <h4>{movie.name}</h4>
                  <img src={movie.image} alt={movie.name} />
                  <p>Category: {movie.category}</p>
                  <p>{movie.description}</p>
                  <p className="price">
                    <span className="a-price-whole">{whole}</span>
                    <span className="a-price-decimal"></span>
                    <span className="a-price-fraction">{fraction}</span>
                    <span className="a-price-symbol"> €</span>
                  </p>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
 */


/* import React, { useState, useEffect } from "react";
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
      {movies.map((movie) => {
          const [whole, fraction] = movie.price.toFixed(2).split(".");
          return (
            (movie.name.toLowerCase().includes(search.toLowerCase()) ||
              movie.category.toLowerCase().includes(search.toLowerCase())) && (
              <div className="udash-res-cont" key={movie._id}>
                <div className="udash-res">
                  <h4>{movie.name}</h4>
                  <img src={movie.image} alt={movie.name} />
                  <p>Category: {movie.category}</p>
                  <p>{movie.description}</p>
                  <p className="price">
                    <span className="a-price-whole">{whole}</span>
                    <span className="a-price-decimal"></span>
                    <span className="a-price-fraction">{fraction}</span>
                    <span className="a-price-symbol"> €</span>
                  </p>
                  </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default UserDashboard; */


import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";

  // POST request to add to cart
  const addToUDash = async (userId, product) => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  //  PATCH request to update cart item
const updateCartItem = async (userId, cartItemId, updatedItem) => {
  try {
    const response = await fetch(`http://localhost:3001/users/${userId}/cart/${cartItemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating cart item:", error);
  }
};

// DELETE request to remove cart item
const removeUDashItem = async (userId, cartItemId) => {
  try {
    const response = await fetch(`http://localhost:3001/users/${userId}/cart/${cartItemId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error removing cart item:", error);
  }
};

// GET request to get cart items
const getCartItems = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3001/users/${userId}/cart`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting cart items:", error);
  }
};

// handlesubmit missing???

const UserDashboard = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const debouncedFetchMovies = useCallback(
    debounce(async (query) => {
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
    }, 500),
    []
  );


  useEffect(() => {
    debouncedFetchMovies(search);
    return () => {
      debouncedFetchMovies.cancel();
    };
  }, [search, debouncedFetchMovies]);

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
        {movies.map((movie) => {
          const [whole, fraction] = movie.price.toFixed(2).split(".");
          return (
            (movie.name.toLowerCase().includes(search.toLowerCase()) ||
              movie.category.toLowerCase().includes(search.toLowerCase())) && (
              <div className="udash-res-cont" key={movie._id}>
                <div className="udash-res">
                  <Link to={`/product/${movie._id}`} state={{ movie }}>
                    <h3>{movie.name}</h3>
                    <img src={movie.image} alt={movie.name} />
                    <p>Genre: {movie.category}</p>
                    {/* <p>{movie.description}</p> */}
                    <p className="price">
                      <span className="a-price-whole">{whole}</span>
                      <span className="a-price-decimal"></span>
                      <span className="a-price-fraction">{fraction}</span>
                      <span className="a-price-symbol"> €</span>
                    </p>
                  </Link>
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default UserDashboard;

