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
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(
    "🚀TCL: ~ file: filter_context.js ~ line 21 ~ filtered_products",
    state.filtered_products
  );
  useEffect(() => {
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
    console.log("handleSortProducts", state.sort);
    // dispatch({ type: SORT_PRODUCTS, payload: { value: state.sort } });
    dispatch({ type: SORT_PRODUCTS });
  };
  useEffect(() => {
    handleSortProducts();
  }, [state.sort]);

  return (
    <FilterContext.Provider
      value={{ ...state, handleGridView, handleListView, updateSort }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
