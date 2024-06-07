import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const HomeUser = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

  if (formData.role === "user") {
    navigate("/user");
  } else {
    console.log("Invalid User");
  }

  return (
    <div className="prodText">
      {/* <h1>Home</h1> */}
      <div>
        {/* <h2>Products</h2> */}
        <div className="containerProduct">
          {products.map((product) => (
            // link to user established
            <Link to="/user" key={product._id}>
              <div className="cardProduct">
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
                <p>Plot: {product.description}</p>
                <p className="price">
                  <p
                    className="price"
                    dangerouslySetInnerHTML={{
                      __html:
                        product.price
                          .toFixed(2)
                          .replace(".", ",")
                          .replace(/,(\d{2})$/, ",<sup>$1</sup>") + " €",
                    }}
                  ></p>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeUser;
