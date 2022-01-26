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
import mockSingleProductDataFeatured from "../utils/mockSingleProductDataFeatured";

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
        // products_error: { show: true, msg: "Cannot fetch" },
        products_error: true,
      };
    case GET_FEATURED_PRODUCTS: {
      const featured_products = payload.data.filter(
        (product) => product.featured === true
      );
      return { ...state, products_loading: false, featured_products };
    }
    case GET_SINGLE_PRODUCT_BEGIN:
      return {
        ...state,
        single_product_loading: true,
        single_product_error: false,
      };

    case GET_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        single_product_loading: false,
        single_product: payload.data,
      };
    case GET_SINGLE_PRODUCT_ERROR:
      return {
        ...state,
        single_product_loading: false,
        single_product_error: true,
      };
    case GET_SINGLE_PRODUCT_MOCK:
      return {
        ...state,
        single_product_loading: false,
        single_product: mockSingleProductDataFeatured,
      };
    default:
      throw new Error(`No Matching "${type}" - action type`);
    // return state;
  }
};

export default products_reducer;
