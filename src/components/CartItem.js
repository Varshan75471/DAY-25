import React from "react";
import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { dispatch } = useCart();

  const increment = () => {
    dispatch({ type: "INCREMENT", payload: item.id });
  };

  const decrement = () => {
    dispatch({ type: "DECREMENT", payload: item.id });
  };

  return (
    <div className="cart-item">
      <div>
        <h4>{item.name}</h4>
        <p>Price: ${item.price}</p>
      </div>
      <div className="quantity-buttons">
        <button onClick={decrement} disabled={item.quantity === 1}>-</button>
        <span>{item.quantity}</span>
        <button onClick={increment}>+</button>
      </div>
      <p>Total: ${item.price * item.quantity}</p>
    </div>
  );
};

export default CartItem;
