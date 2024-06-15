import React, { useState, useEffect } from "react";

const UserCart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch(
      `http://localhost:3001/api/cart/users/${localStorage.getItem(
        "userId"
      )}/cart`
    )
      .then((response) => response.json())
      .then((data) => {
        setCart(data);
        setTotal(
          data.reduce(
            (acc, item) => acc + item.product.price * item.quantity,
            0
          )
        );
      });
  }, []);

  const updateQuantity = (_id, quantity) => {
    setCart(
      cart.map((item) => (item._id === _id ? { ...item, quantity } : item))
    );
    setTotal(
      cart.reduce(
        (acc, item) =>
          acc +
          (item._id === _id ? quantity : item.quantity) * item.product.price,
        0
      )
    );
  };

  const deleteItem = async (_id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/cart/users/${localStorage.getItem(
          "userId"
        )}/cart/${_id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setCart(cart.filter((item) => item._id !== _id));
      setTotal(
        cart.reduce(
          (acc, item) =>
            acc + (item._id !== _id ? item.quantity * item.product.price : 0),
          0
        )
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="cart-body">
      {cart.map((item) => (
        <div key={item._id} className="cart-card">
          <div className="cart-card-image-box">
            <img
              src={item.product.image}
              alt={item.product.name}
              title={item.product.name}
              className="cart-card-image"
            />
          </div>
          <div>
            <h4>{item.product.name}</h4>
            <input
              type="number"
              min="1"
              max="10"
              value={item.quantity}
              onChange={(e) => updateQuantity(item._id, e.target.value)}
            />
            <button onClick={() => deleteItem(item._id)}>Löschen</button>
          </div>
        </div>
      ))}
      <h3>Gesamtpreis: {total}</h3>
    </div>
  );
};

export default UserCart;
