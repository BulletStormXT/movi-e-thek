import React, { useState, useEffect } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="prodText">
      {/* <h1>Home</h1> */}
      <div>
        {/* <h2>Products</h2> */}
        <div className="containerProduct">
          {products.map((product) => (
            <div key={product._id} className="cardProduct">
              <p>
                <img
                  src={product.image}
                  alt={product.name}
                  title={product.name}
                  className="imgProduct"
                />
              </p>
              <h4 className="text-center">{product.name}</h4>
              <p>{product.category}</p>
              <p>Plot: {product.description}</p>
              <p>{product.price.toFixed(2).replace(".", ",")} €</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
