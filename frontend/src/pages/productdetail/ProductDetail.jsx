import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRating from "./StarRating";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductAndMovie = async () => {
      try {
        // Fetch product data
        const productResponse = await fetch(
          `http://localhost:3001/api/products/${productId}`
        );
        if (!productResponse.ok) {
          throw new Error("Failed to fetch product data");
        }
        const productData = await productResponse.json();
        setProduct(productData);

        // Fetch movie data based on product name
        const movieResponse = await fetch(
          `http://localhost:3001/api/movies/movie/title/${encodeURIComponent(
            productData.name
          )}`
        );
        if (!movieResponse.ok) {
          throw new Error("Failed to fetch movie data");
        }
        const movieData = await movieResponse.json();
        setMovie(movieData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      }
    };

    fetchProductAndMovie();
  }, [productId]);

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/cart/users/${localStorage.getItem(
          "userId"
        )}/cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId, quantity }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("Added to cart successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product || !movie) {
    return <p>No data available.</p>;
  }

  const { name, image, price } = product;

  const {
    Released,
    Genre,
    Runtime,
    Director,
    Actors,
    Plot,
    Country,
    BoxOffice,
    Awards,
    imdbRating,
  } = movie;

  const [whole, fraction] = product.price.toFixed(2).split(".");

  return (
    <div className="contProd-det">
      <div className="left">
        <img src={image} alt={name} />
      </div>
      {/* <p>
        <strong>Category:</strong> {category}
      </p>
      <p>
        <strong>Description:</strong> {description}
      </p> */}
      <div className="middle">
        <h2>{name}</h2>
        <div className="movie-detail mid-t">
          {/* <h3>Movie Details</h3> */}
          {/* <p>
            <strong>Title:</strong> {movie.Title}
          </p> */}
          <div className="details mid-b">
            <p>
              <strong>Released:</strong> {Released}
            </p>
            <p>
              <strong>Genre:</strong> {Genre}
            </p>
            <p>
              <strong>Runtime:</strong> {Runtime}
            </p>
            <p>
              <strong>Director:</strong> {Director}
            </p>
            <p>
              <strong>Actors:</strong> {Actors}
            </p>
            <p>
              <strong>Plot:</strong> {Plot}
            </p>
            <p>
              <strong>Filming Locations:</strong> {Country}
            </p>
            <p>
              <strong>Box office(Domestic):</strong> {BoxOffice}
            </p>
            <p>
              <strong>Awards:</strong> {Awards}
            </p>
            <p>
              <strong>IMDb Rating:</strong> {imdbRating}
            </p>
            <StarRating rating={imdbRating} />
          </div>
          {/* <p>
          <strong>Year:</strong> {Year}
        </p> */}
        </div>
      </div>
      <div className="right">
        <p className="price">
          <span className="a-price-whole">{whole}</span>
          <span className="a-price-decimal"></span>
          <span className="a-price-fraction">{fraction}</span>
          <span className="a-price-symbol"> €</span>
        </p>
        <button className="add2SC" onClick={() => addToCart(product._id)}>
          Add to Cart
        </button>
        <button className="buy-now">Buy Now</button>
      </div>
    </div>
  );
};

export default ProductDetail;
