import React, { useEffect } from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";
import { UPDATE_FILTERS } from "../actions";

const Filters = () => {
  const {
    filters: {
      searchText,
      category,
      company,
      color,
      price,
      min_price,
      max_price,
      free_shipping,
    },
    updateFilters,
    clearFilters,
    allCategories,
    filtered_products,
    all_products,
  } = useFilterContext();
  // const categories = getUniqueValues(all_products, "category");
  const categories = getUniqueValues(filtered_products, "category");
  const colors = getUniqueValues(all_products, "colors");
  const companies = getUniqueValues(all_products, "company");
  return (
    <Wrapper>
      <form action='' onSubmit={(e) => e.preventDefault()}>
        {/*& Search Input */}
        <div className='form-control'>
          <input
            type='text'
            name='searchText'
            className='search-input'
            placeholder='Search'
            value={searchText}
            onChange={updateFilters}
          />
        </div>
        {/*& END Search Input */}
        {/*& CATEGORY */}
        <div className='form-control'>
          <h5>Category</h5>
          {!!categories &&
            categories.map((c, index) => (
              <button
                type='button'
                className={`${category === c.toLowerCase() ? "active" : ""}`}
                key={index}
                name='category'
                onClick={updateFilters}
                value={c.toLowerCase()}
              >
                {c}
              </button>
            ))}
        </div>

        {/*& COMPANY */}
        <div className='form-control'>
          <h5>Company</h5>
          <select
            name='company'
            id='company'
            className='company'
            value={company}
            onChange={updateFilters}
          >
            {companies.map((c, index) => (
              <option value={c} key={index}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/*& COLOR */}
        <div className='form-control'>
          <h5>Color</h5>
          <div className='colors'>
            {/*& CODE 1 */}
            {/* <button
              className={`all-btn ${color === "all" ? "active" : ""}`}
              value='all'
              onClick={updateFilters}
              name='color'
            >
              All
            </button>
            {colors.slice(1).map((c, index) => (
              <button
                key={index}
                className={`color-btn ${color === c ? "active" : ""}`}
                style={{ backgroundColor: c }}
                value={c}
                onClick={updateFilters}
                name='color'
              >
                {color === c && <FaCheck />}
              </button>
            ))} */}
            {/*& CODE 2 */}
            {colors.map((c, index) => {
              if (c === "all") {
                return (
                  <button
                    key={index}
                    className={`all-btn ${color === c ? "active" : ""}`}
                    // value={c}
                    onClick={updateFilters}
                    name='color'
                    data-color={"all"}
                  >
                    All
                  </button>
                );
              }
              return (
                <button
                  key={index}
                  className={`color-btn ${color === c ? "active" : ""}`}
                  style={{ backgroundColor: c }}
                  // value={c}
                  onClick={updateFilters}
                  name='color'
                  data-color={c}
                >
                  {color === c && <FaCheck />}
                </button>
              );
            })}
          </div>
        </div>

        {/*& PRICE */}
        <div className='form-control'>
          <h5>Price</h5>
          <p>{formatPrice(price)}</p>
          <input
            type='range'
            name='price'
            id='price'
            min={min_price}
            max={max_price}
            value={price}
            onChange={updateFilters}
          />
        </div>

        {/*& SHIPPING */}
        <div className='form-control shipping'>
          <label htmlFor='free_shipping'>free shipping</label>
          <input
            type='checkbox'
            name='free_shipping'
            id='shipping'
            value={free_shipping}
            onChange={updateFilters}
          />
        </div>
      </form>
      <button className='clear-btn' onClick={clearFilters}>
        clear filters
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
