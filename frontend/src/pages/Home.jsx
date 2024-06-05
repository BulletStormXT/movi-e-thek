import { useState } from "react";

const Home = ({ products, addToCart, itemCount }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartPosition, setCartPosition] = useState({ x: 0, y: 0 });

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleProductClick = (product, event) => {
    setSelectedProduct(product);
    const rect = event.target.getBoundingClientRect();
    setCartPosition({ x: rect.left, y: rect.top });
    toggleCart();
  };

  if (!Array.isArray(products) || products.length === 0) {
    return <div>No products available</div>;
  }

  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <div style={{ marginTop: "50px" }}>
      {/* <h1>Categories</h1> */}
      <div className="category-container">
        {categories.map((category) => (
          <div key={category} className="category">
            <a href={`/products?category=${category}`}>{category}</a>
          </div>
        ))}
      </div>
      {/* <h1>Products</h1> */}
      <div className="product-container">
        {products.map((product) => (
          <div
            key={product.id}
            className="product"
            onClick={(e) => handleProductClick(product, e)}
          >
            <img src={product.image} alt={product.name} width={"250px"} />
            <div className="product-details">
              <h3>{product.name}</h3>
              <p>{product.category}</p>
              <p>Price: {product.price}€</p>
              <div>
                <button
                  className="cart-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart();
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isCartOpen && selectedProduct && (
        <div
          className="popup-cart-container"
          style={{ top: cartPosition.y, left: cartPosition.x }}
        >
          <div className="popup-cart">
            <h3>{selectedProduct.name}</h3>
            <div className="product-details">
              <h4>Spicy Information</h4>
              <ul>
                {selectedProduct.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
            <button onClick={toggleCart}>Close</button>
          </div>
        </div>
      )}
      <div>
        <h2>Cart</h2>
        <p>Item count: {itemCount}</p>
      </div>
    </div>
  );
};

export default Home;
