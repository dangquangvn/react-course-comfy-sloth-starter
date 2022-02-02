import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";

const getLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(cart);
  } else {
    return [];
  }
};

const initialState = {
  // store ordered product
  // cart_products: [], -> self
  cart: getLocalStorage(),
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
  //remove item
  const handleRemoveCartItems = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: { id } });
  };
  // toggle amount
  const handleToggleAmount = (id, value) => {};
  // clear cart
  const handleClearCart = () => {};

  //local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        handleAddToCart,
        handleRemoveCartItems,
        handleToggleAmount,
        handleClearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
