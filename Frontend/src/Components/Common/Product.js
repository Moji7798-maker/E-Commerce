import React from "react";
import DisplayImage from "./DisplayImage";
import { fixDigit } from "../../helperFunctions";
import { Link } from "react-router-dom";

const Product = ({ product, imageStyle, classname = "", lastElementRef }) => {
  return (
    <div ref={lastElementRef} className={`product ${classname}`}>
      <div className="product-content">
        <div className="discount-percentage">
          <span>{fixDigit(product.discount)}%</span>
        </div>
        <DisplayImage product={product} style={imageStyle} url={"product"} />
        <div className="product-name">
          <Link to={`product/${product._id}`}>
            <h3>{product.name}</h3>
          </Link>
        </div>
        <div className="prices">
          {product.oldPrice ? (
            <p className="old-price">{fixDigit(product.oldPrice)}</p>
          ) : (
            <p className="old-price hidden">{product.oldPrice}</p>
          )}
          <p className="new-price">
            <span>{fixDigit(product.newPrice)}</span> تومان
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
