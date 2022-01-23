import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/products_reducer";
import { products_url as url } from "../utils/constants";
import mockProducts from "../utils/mockProductsData";
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
  GET_FEATURED_PRODUCTS,
} from "../actions";

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: { show: false, msg: "" },
  // products: [],
  products: mockProducts,
  featured_products: [],
};

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSidebar = () => {
    // console.log("open sidebar");
    dispatch({ type: SIDEBAR_OPEN });
  };
  const closeSidebar = () => {
    // console.log("close sidebar");
    dispatch({ type: SIDEBAR_CLOSE });
  };

  const fetchProducts = async (url) => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const { data } = await axios.get(url);
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: { data } });
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };

  const getFeaturedProducts = () => {
    dispatch({ type: GET_FEATURED_PRODUCTS, payload: { data: mockProducts } });
  };
  useEffect(() => {
    // fetchProducts(url);
    getFeaturedProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ ...state, openSidebar, closeSidebar }}>
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
