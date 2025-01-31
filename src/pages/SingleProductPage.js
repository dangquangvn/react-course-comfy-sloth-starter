import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MOCK_SINGLE_PRODUCT_ID } from "../actions";
import { useCartContext } from "../context/cart_context";

const SingleProductPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
    getSingleProductMock,
  } = useProductsContext();

  useEffect(() => {
    fetchSingleProduct(id);
    // getSingleProductMock(`${url}${id}`);
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        history.push("/");
      }, 3000);
    }
    // eslint-disable-next-line
  }, [error]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  const {
    name,
    price,
    images,
    reviews,
    stars,
    description,
    id: sku,
    company,
    stock,
    colors,
  } = product;
  return (
    <Wrapper>
      <PageHero title={name} isProduct />
      <div className='section section-center page'>
        <Link className='btn' to={"/products"}>
          back to products
        </Link>
        <div className='product-center'>
          {/* {!!images && <img src={images[0].url} alt={`${name}-img1`} />} */}
          <ProductImages images={images} />
          <section className='content'>
            <h2 className='title'>{name}</h2>
            {/* <div className='rating'>
              <span>{stars}</span>
              <span>({reviews} customer reviews)</span>
            </div> */}
            <Stars stars={stars} reviews={reviews} />
            <h5 className='price'>{formatPrice(price)}</h5>
            <div className='desc'>{description}</div>
            <p className='info'>
              <span>Available:</span>
              {stock > 0 ? "in stock" : "out stock"}
            </p>
            <p className='info'>
              <span>SKU : </span>
              {sku}
            </p>
            <p className='info'>
              <span>Brand :</span>
              {company}
            </p>
            <hr />
            {stock > 0 && <AddToCart product={product} />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
