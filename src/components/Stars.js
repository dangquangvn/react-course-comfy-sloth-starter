import React from "react";
import styled from "styled-components";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
const Stars = ({ stars, reviews }) => {
  //TODO: method 1 -> using for loopj
  // let renderStar = [];
  // for (let i = 0; i < 5; i++) {
  //   let temp = i + 0.5;
  //   if (stars >= i + 1) {
  //     renderStar.push(<BsStarFill />);
  //   } else if (stars >= temp) {
  //     renderStar.push(<BsStarHalf />);
  //   } else {
  //     renderStar.push(<BsStar />);
  //   }
  // }

  //TODO: method 2 -> using Array.from built-in func
  const tempStars = Array.from({ length: 5 }, (_, index) => {
    const halfStar = index + 0.5;
    return (
      <span key={index}>
        {stars > index + 1 ? (
          <BsStarFill />
        ) : stars > halfStar ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    );
  });
  return (
    <Wrapper>
      <div className='stars'>
        {/* <span>{renderStar}</span> */}
        <span>{tempStars}</span>
      </div>
      <p>( {reviews} customer reviews )</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`;
export default Stars;
