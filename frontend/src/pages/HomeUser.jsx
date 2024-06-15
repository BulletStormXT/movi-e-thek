import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const HomeUser = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });
  const role = localStorage.getItem("role");
  const isLoggedIn = role === "user";

  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  //   doesn't work now
  // if (formData.role === "user") {
  //   navigate("/user");
  // } else {
  //   console.log("Invalid User");
  // }

  //add to cart logic
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
      navigate("/cart");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="prodText">
      {/* <h1>Home</h1> */}
      <div>
        {/* <h2>Products</h2> */}
        <div className="containerProduct">
          {products.map((product) => {
            const [whole, fraction] = product.price.toFixed(2).split(".");
            // link to user established
            return (
              <div key={product._id}>
                <div className="cardProduct">
                  <Link to={`/product/${product._id}`}>
                    <p>
                      <img
                        src={product.image}
                        alt={product.name}
                        title={product.name}
                        className="imgProduct"
                      />
                    </p>
                    <h4 className="text-center">{product.name}</h4>
                    <p>Genre: {product.category}</p>
                    {/* <p>Plot: {product.description}</p> */}

                    <p className="price">
                      <span className="a-price-whole">{whole}</span>
                      <span className="a-price-decimal"></span>
                      <span className="a-price-fraction">{fraction}</span>
                      <span className="a-price-symbol"> €</span>
                    </p>
                  </Link>

                  {isLoggedIn && (
                    <>
                      {" "}
                      <button
                        className="add2Db"
                        onClick={() => navigate("/user/dashboard")}
                      >
                        Add to Dashboard
                      </button>
                      <button
                        className="add2SC"
                        onClick={() => addToCart(product._id)}
                      >
                        Add to Shopping Cart
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeUser;
