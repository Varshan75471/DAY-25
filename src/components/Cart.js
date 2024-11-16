import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";
import "./Cart.css";

const Cart = () => {
  const { state, dispatch } = useCart();

  useEffect(() => {
    // Fetch JSON data
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((response) => response.json())
      .then((data) => {
        // Map data into a cart item format
        const items = data.map((item) => ({
          id: item.id,
          name: item.title,
          price: Math.floor(Math.random() * 100 + 20), // Random price
          quantity: 1,
        }));
        dispatch({ type: "SET_ITEMS", payload: items });
      });
  }, [dispatch]);

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {state.items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
      <hr />
      <div className="total-section">
        <h3>Total Quantity: <span>{state.totalQuantity}</span></h3>
        <h3>Total Amount: <span>${state.totalAmount.toFixed(2)}</span></h3>
      </div>
    </div>
  );
};

export default Cart;
