import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { checkNumber, formatPrice } from "../utils/helpers";
import AmountButtons from "./AmountButtons";
import { FaTrash } from "react-icons/fa";
import { useCartContext } from "../context/cart_context";
const CartItem = (props) => {
  const { id, image, name, color, amount, max, price } = props;
  const { handleToggleAmount, handleRemoveCartItems } = useCartContext();
  // const [newAmount, setNewAmount] = useState(amount);
  const handleCount = (e) => {
    const isMinusBtn = e.target.classList.contains("btn-minus");
    if (isMinusBtn) {
      // setNewAmount((oldAmount) =>
      //   checkNumber({ value: oldAmount - 1, min: 1 })
      // );
      handleToggleAmount(id, "dec");
    } else {
      // setNewAmount((oldAmount) => checkNumber({ value: oldAmount + 1, max }));
      handleToggleAmount(id, "inc");
    }
  };

  // useEffect(() => {
  //   handleToggleAmount(id, newAmount);
  // }, [newAmount]);

  return (
    <Wrapper>
      <div className='title'>
        <img src={image} alt={name} />
        <div>
          <h5 className='name'>{name}</h5>
          <p className='color'>
            Color:
            <span style={{ backgroundColor: color }}></span>
          </p>
          {/* 2 price layout */}
          {/* price layout for small screen */}
          <h5 className='price-small'>{formatPrice(price)}</h5>
        </div>
      </div>
      {/* 2 price layout */}
      {/* price layout for large screen */}
      <div className='price'>{formatPrice(price)}</div>
      <div className='amount-bts'>
        {/* method 1 */}
        {/* <AmountButtons amount={newAmount} handleCount={handleCount} /> */}
        {/* method 2 */}
        <AmountButtons amount={amount} handleCount={handleCount} />
      </div>
      <h5 className='subtotal'>{formatPrice(price * amount)}</h5>
      <button className='remove-btn' onClick={() => handleRemoveCartItems(id)}>
        <FaTrash />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  .subtotal {
    display: none;
  }
  .price {
    display: none;
  }
  display: grid;
  grid-template-columns: 200px auto auto;
  grid-template-rows: 75px;
  gap: 3rem 1rem;
  justify-items: center;
  margin-bottom: 3rem;
  align-items: center;
  .title {
    grid-template-rows: 75px;
    display: grid;
    grid-template-columns: 75px 125px;
    align-items: center;
    text-align: left;
    gap: 1rem;
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  h5 {
    font-size: 0.75rem;
    margin-bottom: 0;
  }

  .color {
    color: var(--clr-grey-5);
    font-size: 0.75rem;
    letter-spacing: var(--spacing);
    text-transform: capitalize;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    span {
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      background: red;
      margin-left: 0.5rem;
      border-radius: var(--radius);
    }
  }
  .price-small {
    color: var(--clr-primary-5);
  }
  .amount-btns {
    width: 75px;
    button {
      width: 1rem;
      height: 0.5rem;
      font-size: 0.75rem;
    }
    h2 {
      font-size: 1rem;
    }
  }
  .remove-btn {
    color: var(--clr-white);
    background: transparent;
    border: transparent;
    letter-spacing: var(--spacing);
    background: var(--clr-red-dark);
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius);
    font-size: 0.75rem;
    cursor: pointer;
  }
  @media (min-width: 776px) {
    .subtotal {
      display: block;
      margin-bottom: 0;
      color: var(--clr-grey-5);
      font-weight: 400;
      font-size: 1rem;
    }
    .price-small {
      display: none;
    }
    .price {
      display: block;
      font-size: 1rem;
      color: var(--clr-primary-5);
      font-weight: 400;
    }
    .name {
      font-size: 0.85rem;
    }
    .color {
      font-size: 0.85rem;
      span {
        width: 0.75rem;
        height: 0.75rem;
      }
    }
    grid-template-columns: 1fr 1fr 1fr 1fr auto;
    align-items: center;
    grid-template-rows: 75px;
    img {
      height: 100%;
    }
    .title {
      height: 100%;
      display: grid;
      grid-template-columns: 100px 200px;
      align-items: center;
      gap: 1rem;
      text-align: left;
    }
    .amount-btns {
      width: 100px;
      button {
        width: 1.5rem;
        height: 1rem;
        font-size: 1rem;
      }
      h2 {
        font-size: 1.5rem;
      }
    }
  }
`;

export default CartItem;
