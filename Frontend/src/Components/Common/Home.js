import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { getProducts } from "./commonApi";
import ShowNotif from "./ShowNotif";
import ProductCarousel from "./ProductCarousel";
import Products from "./Products";
import Product from "./Product";
import { connect } from "react-redux";
import {
  setBestSellersRedux,
  setNewArrivalsRedux,
} from "../../Store/actions/userActions";

const Home = ({
  setBestSellersRedux,
  setNewArrivalsRedux,
  bestSellers,
  newArrivals,
}) => {
  const [error, setErrors] = useState({});

  const options = {
    loop: true,
    rtl: true,
    dots: false,
    nav: false,
    // center: true,
    margin: 10,
    responsive: {
      0: {
        items: 1,
      },
      568: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  };

  const init = () => {
    if (bestSellers.length === 0) {
      getProducts(4, "sold").then((data) => {
        if (data) {
          if (data.error) {
            setErrors(data.error);
          } else {
            setBestSellersRedux(data);
          }
        }
      });
    }

    if (newArrivals.length === 0) {
      getProducts(4, "createdAt").then((data) => {
        if (data) {
          if (data.error) {
            setErrors(data.error);
          } else {
            setNewArrivalsRedux(data);
          }
        }
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      {error.notif ? <ShowNotif message={error.notif} /> : null}
      <Header
        display={{ navbar: true, mainSearch: true, features: true }}
        spaces={{ navbar: 2, mainSearch: 2, features: 0 }}
      />
      <Products classname={"best-sellers"} title={"پرفروش ‌ترین محصولات"}>
        {bestSellers.length > 0 && (
          <ProductCarousel options={options} classname="products">
            {bestSellers.map((p, i) => (
              <Product
                key={i}
                product={p}
                imageStyle={{
                  maxWidth: "120px",
                  width: "100%",
                  maxHeight: "120px",
                  height: "100%",
                  margin: "0 auto",
                }}
              />
            ))}
          </ProductCarousel>
        )}
      </Products>
      <Products
        classname={"new-arrivals"}
        title={"تازه ترین محصولات"}
        brands={true}
      >
        {newArrivals.length > 0 && (
          <ProductCarousel options={options} classname="products">
            {newArrivals.map((p, i) => (
              <Product
                key={i}
                product={p}
                imageStyle={{
                  maxWidth: "110px",
                  width: "100%",
                  maxHeight: "120px",
                  height: "100%",
                  margin: "0 auto",
                }}
              />
            ))}
          </ProductCarousel>
        )}
      </Products>
      {/* TODO: articles */}
      <Footer display={{ info: true, rights: true }} space={true} />
    </>
  );
};

const mapStateToProps = (state) => ({
  bestSellers: state.userProducts.bestSellers,
  newArrivals: state.userProducts.newArrivals,
});

export default connect(mapStateToProps, {
  setBestSellersRedux,
  setNewArrivalsRedux,
})(Home);
