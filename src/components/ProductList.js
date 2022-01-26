import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const {
    grid_view,
    list_view,
    all_products,
    filtered_products: filtered,
  } = useFilterContext();
  if (filtered.length < 1) {
    return (
      <h5 style={{ textTransform: "none" }}>
        Sorry, no products matched your search...
      </h5>
    );
  }
  if (grid_view) {
    return <GridView filtered={filtered} />;
  }
  return <ListView filtered={filtered} />;
};

export default ProductList;
