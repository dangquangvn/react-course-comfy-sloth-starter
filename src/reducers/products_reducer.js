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

// const products_reducer = (state, action) => {
const products_reducer = (state, { type, payload }) => {
  switch (type) {
    case SIDEBAR_OPEN:
      return { ...state, isSidebarOpen: true };
    case SIDEBAR_CLOSE:
      return { ...state, isSidebarOpen: false };
    case GET_PRODUCTS_BEGIN:
      return { ...state, products_loading: true };
    case GET_PRODUCTS_SUCCESS: {
      const featured_products = payload.data.filter(
        (product) => product.featured === true
      );
      return {
        ...state,
        products_loading: false,
        featured_products,
        products: payload.data,
      };
    }
    case GET_PRODUCTS_ERROR:
      return {
        ...state,
        products_loading: false,
        products_error: { show: true, msg: "Cannot fetch" },
      };
    case GET_FEATURED_PRODUCTS: {
      const featured_products = payload.data.filter(
        (product) => product.featured === true
      );
      return { ...state, products_loading: false, featured_products };
    }
    default:
      throw new Error(`No Matching "${type}" - action type`);
    // return state;
  }
};

export default products_reducer;
