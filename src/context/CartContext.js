import React, { createContext, useContext, useReducer } from "react";

// Create Context
const CartContext = createContext();

// Initial State
const initialState = {
  items: [], // Cart items
  totalQuantity: 0,
  totalAmount: 0,
};

// Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_ITEMS":
      return {
        ...state,
        items: action.payload,
        totalQuantity: action.payload.reduce((acc, item) => acc + item.quantity, 0),
        totalAmount: action.payload.reduce((acc, item) => acc + item.quantity * item.price, 0),
      };
    case "INCREMENT":
      const incrementedItems = state.items.map((item) =>
        item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
      );
      return {
        ...state,
        items: incrementedItems,
        totalQuantity: incrementedItems.reduce((acc, item) => acc + item.quantity, 0),
        totalAmount: incrementedItems.reduce((acc, item) => acc + item.quantity * item.price, 0),
      };
    case "DECREMENT":
      const decrementedItems = state.items.map((item) =>
        item.id === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      return {
        ...state,
        items: decrementedItems,
        totalQuantity: decrementedItems.reduce((acc, item) => acc + item.quantity, 0),
        totalAmount: decrementedItems.reduce((acc, item) => acc + item.quantity * item.price, 0),
      };
    default:
      return state;
  }
};

// Provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook
export const useCart = () => {
  return useContext(CartContext);
};
