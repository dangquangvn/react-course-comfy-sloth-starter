import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { sortType } from "../utils/constants";

// const filter_reducer = (state, action) => {
const filter_reducer = (state, { type, payload }) => {
  switch (type) {
    case LOAD_PRODUCTS:
      let maxPrice = payload.data.map((p) => p.price);
      maxPrice = Math.max(...maxPrice);
      return {
        ...state,
        // filtered_products: payload.data,
        // all_products: payload.data,
        all_products: [...payload.data],
        filtered_products: [...payload.data],
        filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
      };
    case SET_GRIDVIEW:
      return { ...state, grid_view: true };
    case SET_LISTVIEW:
      return { ...state, grid_view: false };
    case UPDATE_SORT:
      return { ...state, sort: payload.sort };
    case SORT_PRODUCTS: {
      // let tempSort = payload.value || sort.PRICE_LOWEST;
      const { sort, filtered_products } = state;
      let tempProducts = [...filtered_products];
      // if (tempSort === sort.PRICE_LOWEST) {
      if (sort === sortType.PRICE_LOWEST) {
        console.log("price-lowest === true");
        tempProducts = state.filtered_products.sort(
          (a, b) => a.price - b.price
        );
        // } else if (tempSort === sort.PRICE_HIGHEST) {
      } else if (sort === sortType.PRICE_HIGHEST) {
        console.log("price-highest === true");
        //= short work
        // tempProducts = state.filtered_products.sort(
        //   (a, b) => b.price - a.price
        // );
        //= long work
        tempProducts = state.filtered_products.sort((a, b) => {
          // if A < B (or return negative)
          // sort will put A before B
          if (a.price < b.price) {
            return -1;
          }
          // if A > B (or return positive)
          // sort will put A after B
          if (a.price > b.price) {
            return 1;
          }
          return 0;
        });
        // } else if (tempSort === sort.NAME_A) {
      } else if (sort === sortType.NAME_A) {
        console.log("name_a === true");
        tempProducts = state.filtered_products.sort(
          (a, b) => "" + a.name.localeCompare(b.name)
        );
      } else {
        console.log("name_z === true");
        // tempProducts = state.filtered_products.sort((a, b) => b.name - a.name);
        tempProducts = state.filtered_products.sort(
          (a, b) => "" + b.name.localeCompare(a.name)
        );
      }
      return { ...state, filtered_products: tempProducts };
    }
    case UPDATE_FILTERS: {
      // filters[payload.name]
      return {
        ...state,
        filters: {
          ...state.filters,
          [payload.name]: payload.value,
        },
      };
    }
    case FILTER_PRODUCTS:
      return {
        ...state,
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filter,
          searchText: "",
          category: "all",
          company: "all",
          color: "all",
          price: state.filters.max_price,
          free_shipping: false,
        },
      };
    default:
      throw new Error(`No Matching "${type}" - action type`);
  }
  // return state
};

export default filter_reducer;
