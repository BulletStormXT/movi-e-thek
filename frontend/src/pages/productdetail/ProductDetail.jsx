import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StarRating from "./StarRating";

const ProductDetail = () => {
  const navigate = useNavigate();
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

  const addToDashboard = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/udash/users/${localStorage.getItem(
          "userId"
        )}/udash`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      navigate("/user/dashboard");
    } catch (error) {
      console.error("Error adding to dashboard:", error);
    }
  };

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
        {/* <div className="mid-cont"> */}
        <h2>{name}</h2>
        <div className="movie-detail mid-t">
          {/* <h3>Movie Details</h3> */}
          {/* <p>
            <strong>Title:</strong> {movie.Title}
          </p> */}
          <div className="details mid-b">
            <table className="invisible-table">
              <tr>
                <td className="detailName">
                  <strong>Released:</strong>
                </td>{" "}
                <td>{Released}</td>
              </tr>
              <tr>
                <td>
                  <strong>Genre:</strong>
                </td>{" "}
                <td>{Genre}</td>
              </tr>
              <tr>
                <td>
                  <strong>Runtime:</strong>
                </td>{" "}
                <td>{Runtime}</td>
              </tr>
              <tr>
                <td>
                  <strong>Director:</strong>
                </td>{" "}
                <td>{Director}</td>
              </tr>
              <tr>
                <td>
                  <strong>Actors:</strong>
                </td>{" "}
                <td>{Actors}</td>
              </tr>
              <tr className="plot">
                <td>
                  <strong>Plot:</strong>
                </td>{" "}
                <td>{Plot}</td>
              </tr>
              <tr>
                <td>
                  <strong>Filming Locations:</strong>
                </td>{" "}
                <td>{Country}</td>
              </tr>
              <tr>
                <td>
                  <strong>Box office(Domestic):</strong>
                </td>{" "}
                <td>{BoxOffice}</td>
              </tr>
              <tr>
                <td>
                  <strong>Awards:</strong>
                </td>{" "}
                <td>{Awards}</td>
              </tr>
              <tr>
                <td>
                  <strong>IMDb Rating:</strong>
                </td>{" "}
                <td>
                  <div className="rating-wrapper">
                    <StarRating rating={imdbRating} /> &nbsp;&nbsp;&nbsp;
                    {imdbRating}
                  </div>
                </td>
              </tr>
            </table>
          </div>
          {/* <p>
          <strong>Year:</strong> {Year}
        </p> */}
          {/* </div> */}
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
        <button className="add2Db" onClick={() => addToDashboard(product._id)}>
          Add to Dash
        </button>
        {/* buy now button without function */}
        <button className="buy-now">Buy Now</button>
      </div>
    </div>
  );
};

export default ProductDetail;
