import React, { useEffect, useState } from "react";
import { getProduct } from "./commonApi";
import ShowNotif from "./ShowNotif";
import UserProductItem from "./UserProductItem";
import "../../StyleSheets/product.css";
import Header from "./Header";
import Footer from "./Footer";
import GoBack from "./GoBack";
import RelatedProducts from "./RelatedProducts";

const ProductPage = ({ match }) => {
  const [error, setError] = useState({});
  const [product, setProduct] = useState({});
  const [overlay, setOverlay] = useState(false);

  const init = (productId) => {
    setOverlay(true);
    getProduct(productId).then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error);
          setOverlay(false);
        } else {
          setProduct(data.product);
          setOverlay(false);
        }
      }
    });
  };

  useEffect(() => {
    const productId = match.params.productId;
    init(productId);
  }, [match.params.productId]);

  const showOverlay = () => <div className="overlay"></div>;

  return (
    <>
      {overlay && showOverlay()}
      {error.notif && <ShowNotif message={error.notif} />}
      <Header
        display={{ navbar: true, mainSearch: false, features: false }}
        spaces={{ navbar: 1, mainSearch: 0, features: 0 }}
      />
      <GoBack address={"/shop"} />
      {product && <UserProductItem product={product} />}
      <div className="blank-space-120"></div>
      {product && <RelatedProducts product={product} />}
      <Footer display={{ info: true, rights: true }} />
    </>
  );
};

export default ProductPage;
