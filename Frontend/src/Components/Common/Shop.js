import React, { useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Products from "./Products";
import "../../StyleSheets/shop.css";
import ShopSearch from "./ShopSearch";
import ShopFilters from "./ShopFilters";
import ShopProducts from "./ShopProducts";
import GoBack from "./GoBack";
import ShopProductsLoadMore from "./ShopProducts-LoadMore";

const Shop = () => {
  let contactRef = useRef(null);

  return (
    <>
      <Header
        display={{ navbar: true, mainSearch: false, features: false }}
        spaces={{ navbar: 0, mainSearch: 0, features: 0 }}
      />
      <GoBack address={"/"} />
      <Products
        classname="shop"
        space={0}
        title="فروشگاه"
        archiveButton={false}
      >
        <ShopSearch />
        <div className="shop-products-section">
          <ShopFilters />
          {/* <ShopProducts contactRef={contactRef} /> */}
          <ShopProductsLoadMore contactRef={contactRef} />
        </div>
      </Products>
      <Footer contactRef={contactRef} display={{ info: true, rights: true }} />
    </>
  );
};

export default Shop;
