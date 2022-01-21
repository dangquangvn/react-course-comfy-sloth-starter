import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <Wrapper className='page-100'>
      {/* <Wrapper > */}
      {/* <section className='error-container'> */}
      <section>
        <h1>404</h1>
        <h3>Sorry, the page you tried cannot be found</h3>
        <Link to={"/"} className='btn'>
          back home
        </Link>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  background: var(--clr-primary-10);
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  text-align: center;
  .error-container {
    min-height: calc(100vh - 10rem);
    padding: 5rem 0;
  }
  h1 {
    font-size: 10rem;
  }
  h3 {
    text-transform: none;
    margin-bottom: 2rem;
  }
`;

export default ErrorPage;
