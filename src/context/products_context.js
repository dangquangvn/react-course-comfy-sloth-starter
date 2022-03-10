import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/products_reducer";
import { products_url as url, single_product_url } from "../utils/constants";
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
  GET_SINGLE_PRODUCT_MOCK,
} from "../actions";

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  // products: [],
  products: mockProducts,
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
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

  const fetchSingleProduct = async (id) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const { data } = await axios.get(`${single_product_url}${id}`);
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: { data } });
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };

  const getSingleProductMock = (id) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    // console.log("id ne:", id);
    dispatch({ type: GET_SINGLE_PRODUCT_MOCK });
  };

  useEffect(() => {
    fetchProducts(url);
    // getFeaturedProducts();
    // fetchSingleProduct("recNZ0koOqEmilmoz");
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        fetchSingleProduct,
        getSingleProductMock,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
