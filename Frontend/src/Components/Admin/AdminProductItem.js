import React from "react";
import { Link } from "react-router-dom";
import DisplayImage from "../Common/DisplayImage";
// import "../../StyleSheets/productItem.css";
import { fixDigit } from "../../helperFunctions";

const ProductItem = ({ product, onDelete = (f) => f }) => {
  return (
    <>
      <div className="product">
        <DisplayImage
          product={product}
          url={"product"}
          style={{ maxWidth: "150px", width: "100%" }}
        />
        <div className="product-details">
          <div className="product-name">
            ({product.category.name}) {product.name}
          </div>
          <div className="product-price">
            {fixDigit(product.newPrice)} تومان
          </div>
        </div>
        <div className="product-actions">
          <Link to={`/product/update/${product._id}`}>
            <span className="action product-update">
              <i className="fas fa-edit"></i>
              <span>ویرایش محصول</span>
            </span>
          </Link>
          <span
            className="action product-delete"
            onClick={() => onDelete(product._id)}
          >
            <i className="fas fa-trash"></i>
            <span>حذف محصول</span>
          </span>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
