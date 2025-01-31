import React, { useState } from "react";
import styled from "styled-components";
import { FaPlus, FaMinus } from "react-icons/fa";

const AmountButtons = ({ amount, handleCount }) => {
  return (
    <Wrapper>
      <button className='amount-btn btn-minus' onClick={handleCount}>
        <FaMinus />
      </button>
      <h2>{amount}</h2>
      <button className='amount-btn btn-plus' onClick={handleCount}>
        <FaPlus />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  width: 140px;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  h2 {
    margin-bottom: 0;
  }
  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      pointer-events: none;
    }
  }
  h2 {
    margin-bottom: 0;
  }
`;

export default AmountButtons;
