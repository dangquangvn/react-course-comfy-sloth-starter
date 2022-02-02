import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";

const initialState = {
  // store ordered product
  // cart_products: [], -> self
  cart: [],
  // tong so luong san pham ordered
  total_items: 0,
  // tong so tien
  total_amount: 0,
  shipping_fee: 534, //default cents
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // in CartPage need display : product (name, img), mainColor (user choose), amount
  const handleAddToCart = (id, color, amount, product) => {
    console.log(
      "🚀TCL: ~ file: cart_context.js ~ line 29 ~ handleAddToCart ~ id",
      id,
      color,
      amount,
      product
    );
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
  };

  const handleRemoveCartItems = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: { id } });
  };

  return (
    <CartContext.Provider
      value={{ ...state, handleAddToCart, handleRemoveCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
