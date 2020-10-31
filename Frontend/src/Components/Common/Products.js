import React from "react";
import "../../StyleSheets/products.css";
import Brands from "./Brands";

const Products = ({
  children,
  classname,
  title,
  brands = false,
  archiveButton = true,
  space = 1,
}) => {
  return (
    <section id={classname} className={classname}>
      <div className="container">
        {[...Array(space)].map((s, i) => (
          <div key={i} className="blank-space-120"></div>
        ))}
        <header className="products-header best-sellers-header">
          <div className="header-title">
            <h1>{title}</h1>
          </div>
          {archiveButton && (
            <div>
              <button className="shop-button">
                <a href="/shop">آرشیو محصولات</a>
              </button>
            </div>
          )}
        </header>
        {children}
        {brands && (
          <>
            <div className="blank-space-120"></div>
            <Brands />
          </>
        )}
      </div>
    </section>
  );
};

export default Products;
