import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { connect } from "react-redux";
import CartItem from "./CartItem";
import "../../StyleSheets/cart.css";
import CartDetails from "./CartDetails";
import { Redirect } from "react-router-dom";

const Cart = ({ cart }) => {
  return (
    <>
      {cart.length === 0 && <Redirect to="/shop" />}
      <Header
        display={{ navbar: true, mainSearch: false, features: false }}
        spaces={{ navbar: 1, mainSearch: 0, features: 0 }}
      />
      <section id="cart-section" className="cart-section">
        <div className="content">
          <header className="header">
            <h1>سبد خرید</h1>
            <p>
              فهرست محصولاتی که به سبدخرید اضافه کردید را در زیر مشاهده می‌کنید.
            </p>
          </header>
          <table className="cart">
            <tbody>
              {cart.map((c, i) => (
                <CartItem cartitem={c} key={i} />
              ))}
            </tbody>
          </table>
          <CartDetails />
        </div>
      </section>
      <Footer display={{ info: true, rights: true }} />
    </>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, {})(Cart);
