import React from "react";
import OwlCarousel from "react-owl-carousel2";
import "react-owl-carousel2/src/owl.carousel.css";

const ProductCarousel = ({ options, children, classname = "" }) => {
  return (
    <OwlCarousel className={classname} options={options}>
      {children}
    </OwlCarousel>
  );
};

export default ProductCarousel;
