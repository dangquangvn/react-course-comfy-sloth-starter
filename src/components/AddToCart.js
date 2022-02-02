import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { useCartContext } from "../context/cart_context";
import AmountButtons from "./AmountButtons";

const AddToCart = ({ product }) => {
  const { handleAddToCart } = useCartContext();
  const { colors, id, stock } = product;
  const [mainColor, setMainColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);
  const checkNumber = (number) => {
    if (number > stock) {
      return stock;
    } else if (number < 1) {
      return 1;
    } else {
      return number;
    }
  };
  const handleCount = (e) => {
    const checkMinusBtn = e.target.classList.contains("btn-minus");
    if (checkMinusBtn) {
      setAmount((oldAmount) => checkNumber(oldAmount - 1));
    } else {
      setAmount((oldAmount) => checkNumber(oldAmount + 1));
    }
  };
  return (
    <Wrapper>
      <div className='colors'>
        <span>Colors : </span>
        <div>
          {colors.map((color, index) => (
            <button
              className={`color-btn ${mainColor === color ? "active" : ""}`}
              style={{ backgroundColor: color }}
              onClick={() => setMainColor(color)}
              key={index}
            >
              {mainColor === color && <FaCheck />}
            </button>
          ))}
        </div>
      </div>
      <AmountButtons stock={stock} amount={amount} handleCount={handleCount} />
      {/* <Link
        to={"/cart"}
        className='btn-container btn'
        onClick={() => handleAddToCart(id, mainColor, amount, product)}
      >
        add to cart
      </Link> */}
      <div
        className='btn-container btn'
        onClick={() => handleAddToCart(id, mainColor, amount, product)}
      >
        add to cart
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
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
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;
export default AddToCart;
