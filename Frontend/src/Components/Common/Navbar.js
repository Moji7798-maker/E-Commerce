import React, { useState } from "react";
import { isAuth, fixDigit } from "../../helperFunctions";
import { signUserOut } from "../../Store/actions/userActions";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import CartPreview from "./CartPreview";

const Navbar = ({ user, signUserOut, cart }) => {
  const [preview, setPreview] = useState(false);

  const handlePreview = (e) => {
    setPreview(!preview);
  };

  const signout = () => {
    signUserOut();
    localStorage.removeItem("ecom-jwt");
    return <Redirect to="/signin" />;
  };
  const Links = (
    <>
      <ul className="navbar">
        <li className="navbar-item">
          <Link to="/">خانه</Link>
        </li>
        <li className="navbar-item">
          <Link to="/shop">فروشگاه</Link>
        </li>
        {isAuth()
          ? user &&
            user.userInfo &&
            (user.userInfo.role === 0 ? (
              <li className="responsive-menu-item">
                <Link to="/user/dashboard">مدیریت اکانت</Link>
              </li>
            ) : (
              <li className="responsive-menu-item">
                <Link to="/admin/dashboard">مدیریت اکانت</Link>
              </li>
            ))
          : null}
        <li className="navbar-item">
          <Link to="/contact-form">تماس با ما</Link>
        </li>
        <li className="navbar-item">
          <Link to="/about-us">درباره ما</Link>
        </li>
      </ul>
      <ul className="navbar-options">
        <li className="navbar-item cart" onClick={handlePreview}>
          <a>
            <i className="fas fa-shopping-cart"></i>
          </a>
          <sup>
            <span>{fixDigit(cart.length)}</span>
          </sup>
        </li>
        <input type="checkbox" id="toggle" name="toggle" />
        <label htmlFor="toggle">
          <li className="navbar-item auth">
            <span>
              <i className="fas fa-user"></i>
            </span>

            {isAuth() ? (
              <ul className="auth-options">
                <Link to="/signin" onClick={signout}>
                  <li className="auth-option">خروج</li>
                </Link>
              </ul>
            ) : (
              <ul className="auth-options">
                <Link to="/signin">
                  <li className="auth-option">ورود</li>
                </Link>
                <Link to="/signup">
                  <li className="auth-option">ثبت نام</li>
                </Link>
              </ul>
            )}
          </li>
        </label>
      </ul>
    </>
  );

  const responsiveLinks = (
    <>
      <input type="checkbox" id="toggle-menu" name="toggle-menu" />
      <label htmlFor="toggle-menu">
        <li className="navbar-item toggle-menu">
          <span>
            <i className="fas fa-bars"></i>
          </span>
        </li>
      </label>
      <ul className="responsive-menu">
        <li className="responsive-menu-item">
          <Link to="/">خانه</Link>
        </li>
        <li className="responsive-menu-item">
          <Link to="/shop">فروشگاه</Link>
        </li>
        {isAuth()
          ? user &&
            user.userInfo &&
            (user.userInfo.role === 0 ? (
              <li className="responsive-menu-item">
                <Link to="/user/dashboard">مدیریت اکانت</Link>
              </li>
            ) : (
              <li className="responsive-menu-item">
                <Link to="/admin/dashboard">مدیریت اکانت</Link>
              </li>
            ))
          : null}

        <li className="responsive-menu-item">
          <Link to="/contact-us">تماس با ما</Link>
        </li>
        <li className="responsive-menu-item">
          <Link to="/about-us">درباره ما</Link>
        </li>
      </ul>
    </>
  );

  return (
    <>
      <nav className="navbar-section">
        {preview && <CartPreview />}
        <div className="navbar-content">
          <Link to="/" className="navbar-logo">
            <span className="contact-us-icon custom-cream"></span>
          </Link>
          {Links}
        </div>
        {responsiveLinks}
      </nav>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  cart: state.cart,
});

export default connect(mapStateToProps, { signUserOut })(Navbar);
