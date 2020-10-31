import React, { useState } from "react";
import { Link } from "react-router-dom";
import LightBox from "./LightBox";

const DisplayImage = ({ product, url, style, index = 0 }) => {
  const [toggleModal, setToggleModal] = useState(false);
  const [currentIndex, setCurretIndex] = useState(0);

  const handleClick = (index) => (e) => {
    setToggleModal(true);
    setCurretIndex(index);
  };

  const closeModal = () => {
    setToggleModal(false);
  };

  return (
    <>
      <div className="product-image" style={style}>
        {Object.keys(product).length > 0 ? (
          index === 0 ? (
            <Link to={`/product/${product._id}`}>
              <img
                src={`${process.env.REACT_APP_API}/api/${url}/photo/${
                  product._id
                }${index ? "/" + index : ""}`}
                alt={product.name}
              />
            </Link>
          ) : (
            <a
              href={`${process.env.REACT_APP_API}/api/${url}/photo/${
                product._id
              }${index ? "/" + index : ""}`}
              data-attribute="SRL"
            >
              <img
                src={`${process.env.REACT_APP_API}/api/${url}/photo/${
                  product._id
                }${index ? "/" + index : ""}`}
                alt={product.name}
                onClick={handleClick(index)}
              />
            </a>
          )
        ) : null}
      </div>
      {/* {toggleModal && (
        <Modal
          closeModal={closeModal}
          currentIndex={currentIndex}
          product={product}
        />
      )} */}
    </>
  );
};

export default DisplayImage;
