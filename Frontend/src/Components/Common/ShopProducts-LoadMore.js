import React, { useState, useRef, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import {
  setShopProductsRedux,
  setShopDetails,
} from "../../Store/actions/userActions";
import Product from "./Product";
import { filterProducts } from "./commonApi";

const ShopProductsLoadMore = ({
  setShopProductsRedux,
  shopProducts,
  setShopDetails,
  shopDetails,
}) => {
  const [values, setValues] = useState({
    message: "",
    categories: [],
    prices: [],
    skip: 0,
    limit: 100,
    size: 0,
    loading: false,
    overlay: false,
    products: [],
    myFilters: { filters: { category: [], newPrice: [] } },
  });

  const { limit, myFilters, skip, size, loading, overlay } = values;

  const loadProducts = (newFilters) => {
    setValues({ ...values, overlay: true });
    filterProducts(skip, limit, newFilters).then((data) => {
      if (data) {
        if (data.error) {
          setValues({ ...values, error: data.error, overlay: false });
        } else {
          setShopProductsRedux(data.products);
          setShopDetails({ ...shopDetails, size: data.size, skip: 0 });
          setValues({ ...values, size: data.size, skip: 0, overlay: false });
        }
      }
    });
  };

  //   const loadMore = () => {
  //     let toSkip = skip + limit;
  //     setValues({ ...values, loading: true });
  //     filterProducts(skip, limit, myFilters.filters).then((data) => {
  //       if (data && data.error) {
  //         setValues({ ...values, error: data.error, loading: false });
  //       } else {
  //         setShopProductsRedux([...shopProducts, ...data.products]);
  //         setShopDetails({ ...shopDetails, size: data.size, skip: toSkip });
  //         setValues([...shopProducts, ...data.products]);
  //         setValues({
  //           ...values,
  //           size: shopDetails.size,
  //           skip: toSkip,
  //           loading: false,
  //         });
  //       }
  //     });
  //   };

  //   const loadMoreButton = () =>
  //     shopDetails.size > 0 &&
  //     shopDetails.size >= limit && (
  //       <button
  //         onClick={loadMore}
  //         className={`shop-button ${loading ? "loading" : ""}`}
  //       >
  //         <span>
  //           <i className="fas fa-arrow-down"></i>
  //         </span>
  //       </button>
  //     );

  const showOverlay = () => <div className="overlay"></div>;

  useEffect(() => {
    if (shopProducts.length === 0) {
      loadProducts(myFilters.filters);
    }
  }, []);

  return (
    <>
      {overlay && showOverlay()}
      <div className="shop-products">
        <div className="shop-products">
          {shopProducts &&
            shopProducts.length > 0 &&
            shopProducts.map((p, i) => {
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
            })}
        </div>
        {/* {loadMoreButton()} */}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  shopProducts: state.userProducts.shopProducts,
  shopDetails: state.userProducts.shopDetails,
});

export default connect(
  mapStateToProps,
  { setShopProductsRedux, setShopDetails },
  null,
  {
    forwardRef: true,
  }
)(ShopProductsLoadMore);
