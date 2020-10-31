import React, { useState, useRef, useCallback } from "react";
import { connect } from "react-redux";
import { setShopProductsRedux } from "../../Store/actions/userActions";
import Product from "./Product";
import useApi from "../Helper/useApi";

const ShopProducts = ({ setShopProductsRedux, shopProducts, shopFilters }) => {
  const [values, setValues] = useState({
    message: "",
    categories: [],
    prices: [],
    skip: 0,
    limit: 7,
    size: 0,
    products: [],
    pageNumber: 1,
    myFilters: { filters: { category: [], newPrice: [] } },
  });

  const { limit, myFilters, pageNumber, skip } = values;

  const { loading, error, productsApi, hasMore } = useApi(
    pageNumber,
    shopFilters,
    skip,
    limit,
    setShopProductsRedux
  );

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setValues({
              ...values,
              pageNumber: pageNumber + 1,
              skip: skip + limit,
            });
          }
        },
        { threshold: 1 }
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <>
      <div className="shop-products">
        {shopProducts &&
          shopProducts.length > 0 &&
          shopProducts.map((p, i) => {
            if (shopProducts.length === i + 1) {
              return (
                <Product
                  lastElementRef={lastBookElementRef}
                  product={p}
                  key={i}
                  imageStyle={{
                    maxWidth: "120px",
                    width: "100%",
                    maxHeight: "120px",
                    height: "100%",
                    margin: "0 auto",
                  }}
                  classname="shop"
                />
              );
            } else {
              return (
                <Product
                  product={p}
                  key={i}
                  imageStyle={{
                    maxWidth: "120px",
                    width: "100%",
                    maxHeight: "120px",
                    height: "100%",
                    margin: "0 auto",
                  }}
                  classname="shop"
                />
              );
            }
          })}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  shopProducts: state.userProducts.shopProducts,
  shopFilters: state.userProducts.shopFilters,
});

export default connect(mapStateToProps, { setShopProductsRedux }, null, {
  forwardRef: true,
})(ShopProducts);
