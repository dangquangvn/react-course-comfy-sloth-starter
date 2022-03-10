import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: "price-lowest",
  filters: {
    searchText: "",
    category: "all",
    company: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    free_shipping: false,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // console.log("run load products");
    dispatch({ type: LOAD_PRODUCTS, payload: { data: products } });
  }, [products]);

  const handleGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const handleListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };
  const updateSort = (value) => {
    // for demonstration:
    // const name = e.target.name
    // const value = e.target.value
    dispatch({ type: UPDATE_SORT, payload: { sort: value } });
  };
  const handleSortProducts = () => {
    // console.log("handleSortProducts", state.sort);
    // dispatch({ type: SORT_PRODUCTS, payload: { value: state.sort } });
    dispatch({ type: SORT_PRODUCTS });
  };
  useEffect(() => {
    // !important: add filter before sort
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort, state.filters]);

  const allCategories = [
    "all",
    ...new Set(state.filtered_products.map((product) => product.category)),
  ];

  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    // if (name === "category") {
    //   value = e.target.textContent;
    // }
    if (name === "color") {
      // myseft
      // value = e.target.getAttribute("data-color");
      //tutorial
      value = e.target.dataset.color;
    }
    if (name === "price") {
      value = Number(value);
    }
    if (name === "free_shipping") {
      value = e.target.checked;
    }
    // console.log(
    //   "🚀TCL: ~ file: filter_context.js ~ line 69 ~ updateFilters ~ name",
    //   name,
    //   value
    // );
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  return (
    <FilterContext.Provider
      value={{
        ...state,
        handleGridView,
        handleListView,
        updateSort,
        updateFilters,
        clearFilters,
        allCategories,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
