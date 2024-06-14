import React from "react";
import { useLocation } from "react-router-dom";

const ProductDetail = () => {
  const location = useLocation();
  const { movie } = location.state || {};

  if (!movie) {
    return <p>No movie data available.</p>;
  }

  const { name, image, category, description, price } = movie;
  const [whole, fraction] = price.toFixed(2).split(".");

  return (
    <div className="prod-detail">
      <h2>{name}</h2>
      <img src={image} alt={name} />
      <p>Category: {category}</p>
      <p>{description}</p>
      <p className="price">
        <span className="a-price-whole">{whole}</span>
        <span className="a-price-decimal"></span>
        <span className="a-price-fraction">{fraction}</span>
        <span className="a-price-symbol"> €</span>
      </p>
    </div>
  );
};

export default ProductDetail;
