import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

const ProductImages = ({ images = [{ url: "" }] }) => {
  const [value, setValue] = useState(0);
  const [main, setMain] = useState(images[value]);

  const checkNumber = (number) => {
    const lastIndex = images.length - 1;
    if (number > lastIndex) {
      return 0;
    } else if (number < 0) {
      return lastIndex;
    } else return number;
  };

  useEffect(() => {
    setMain(images[checkNumber(value)]);
  }, [value]);
  console.log(
    "🚀TCL: ~ file: ProductImages.js ~ line 6 ~ ProductImages ~ main",
    main
  );
  const handleArrow = (e) => {
    const checkPrevBtn = e.target.classList.contains("icon-left");
    if (checkPrevBtn) {
      setValue((value) => checkNumber(value - 1));
    } else {
      setValue((value) => checkNumber(value + 1));
    }
  };
  return (
    <Wrapper>
      <img src={main.url} alt='img-1' className='main' />
      <div className='gallery'>
        <span className='icon icon-left' onClick={handleArrow}>
          <FaChevronCircleLeft />
        </span>
        {images.map((image, index) => (
          <img
            src={image.url}
            alt={image.filename}
            key={index}
            className={`${image.url === main.url ? "active" : ""}`}
            onClick={() => {
              // setMain(image);
              setValue(index);
            }}
          />
        ))}
        <span className='icon icon-right' onClick={handleArrow}>
          <FaChevronCircleRight />
        </span>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    margin-left: 2rem;
    margin-right: 2rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }

    position: relative;

    .icon {
      position: absolute;
      top: 0;
      transform: translateY(50%);
      left: -2rem;
      font-size: 1.5rem;
      cursor: pointer;
      z-index: 10;

      svg {
        pointer-events: none;
      }
    }
    .icon-right {
      left: unset;
      right: -2rem;
    }
  }
  .active {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`;

export default ProductImages;
