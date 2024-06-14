import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //needs styling, fetches product data from the backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/products/${productId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError("Failed to fetch product data. Please try again later.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>No product data available.</p>;
  }

  const { name, image, category, description, price } = product;
  const formattedPrice = price.toFixed(2);

  return (
    <div className="prod-detail">
      <h2>{name}</h2>
      <div className="product-image">
        <img src={image} alt={name} />
      </div>
      <p>
        <strong>Category:</strong> {category}
      </p>
      <p>
        <strong>Description:</strong> {description}
      </p>
      <p className="price">
        <strong>Price:</strong> {formattedPrice} €
      </p>
    </div>
  );
};

export default ProductDetail;
