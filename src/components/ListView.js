import React, { useState } from "react";
import styled from "styled-components";
import { formatPrice } from "../utils/helpers";
import { Link } from "react-router-dom";
const ListView = ({ filtered }) => {
  const { id, name, image, price, description } = filtered;
  const [more, setMore] = useState(false);
  console.log(
    "🚀TCL: ~ file: ListView.js ~ line 7 ~ ListView ~ filtered",
    filtered
  );
  return (
    <Wrapper>
      {filtered.map(({ id, name, image, price, description }) => (
        <article key={id}>
          <img src={image} alt={name} />
          <div>
            <h4>{name}</h4>
            <h5 className='price'>{formatPrice(price)}</h5>
            <div className='desc'>
              {!more ? (
                <p>{description.substring(0, 150)}... </p>
              ) : (
                <p>{description}</p>
              )}
              {!more ? (
                <span onClick={() => setMore(!more)}>Read more</span>
              ) : (
                <span onClick={() => setMore(!more)}>Hide</span>
              )}
            </div>
            <Link to={`/products/${id}`} className='btn'>
              Details
            </Link>
          </div>
        </article>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  row-gap: 3rem;

  img {
    width: 100%;
    display: block;
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  h4 {
    margin-bottom: 0.5rem;
  }
  .price {
    color: var(--clr-primary-6);
    margin-bottom: 0.75rem;
  }
  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }
  .btn {
    font-size: 0.5rem;
    padding: 0.25rem 0.5rem;
  }
  .desc {
    p {
      display: inline;
    }
    button {
      display: inline-block;
    }
  }
  @media (min-width: 992px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
`;

export default ListView;
