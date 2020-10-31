import React, { useState } from "react";
import Header from "../Common/Header";
import "../../StyleSheets/signin-signup.css";
import Footer from "../Common/Footer";
import { signin } from "./userApi";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setUserData } from "../../Store/actions/userActions";
import { isAuth, authenticate } from "../../helperFunctions";
import ShowNotif from "../Common/ShowNotif";

const Signin = ({ setUserData, user }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    textChange: "ورود",
    error: {},
    success: false,
    message: "",
    redirect: false,
  });

  const { email, password, error, textChange, redirect } = formData;

  const requiredFields = [{ email }, { password }];

  const handleChange = (name) => (e) => {
    setFormData({
      ...formData,
      error: { ...error, [name]: "" },
      [name]: e.target.value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      error: {},
      redirect: false,
      textChange: "در حال ارسال",
    });
    // client side validation
    requiredFields.forEach((field) => {
      if (!field[Object.keys(field)[0]]) {
        error[String(Object.keys(field)[0])] = true;
        setFormData({ ...formData, error: error });
      }
    });
    signin({ email, password }).then((data) => {
      if (data) {
        if (data.error) {
          setFormData({
            ...formData,
            error: data.error,
            success: false,
            textChange: "ورود",
          });
        } else {
          authenticate(data.token, () => {
            setUserData(data.user);
            setFormData({ ...formData, redirect: true });
          });
        }
      }
    });
  };

  const showError = (error, name) => {
    return (
      <div style={{ display: error[name] ? "" : "none" }}>
        <span className="validation">{error && error[name]}</span>
      </div>
    );
  };

  const redirectUser = () => {
    if (user && user.userInfo && user.userInfo.role === 0) {
      return <Redirect to="/user/dashboard" />;
    } else {
      return <Redirect to="/admin/dashboard" />;
    }
  };

  const signInForm = (
    <form>
      <div className="input-group">
        <label htmlFor="email-input"> پست الکترونیک</label>
        <input
          type="email"
          className="input"
          id="email-input"
          name="email"
          value={email}
          onChange={handleChange("email")}
          placeholder="e.g. mojtaba"
        />
        {showError(error, "email")}
      </div>

      <div className="input-group">
        <label htmlFor="password-input">رمز عبور</label>
        <input
          type="password"
          className="input"
          id="password-input"
          name="password"
          value={password}
          onChange={handleChange("password")}
        />
        {showError(error, "password")}
      </div>
    </form>
  );

  return (
    <>
      {isAuth()
        ? user.userInfo &&
          (user.userInfo.role === 0 ? (
            <Redirect to="/user/dashboard" />
          ) : (
            <Redirect to="/admin/dashboard" />
          ))
        : null}
      {redirect && redirectUser()}
      {error.message ? <ShowNotif message={error.message} /> : null}
      <Header
        display={{ navbar: true, mainSearch: false, features: false }}
        spaces={{ navbar: 0 }}
      />
      <section id="signin" className="signin">
        <div className="signin-content">
          <header className="products-header best-sellers-header">
            <div className="header-title">
              <h1>ورود</h1>
            </div>
          </header>
          {signInForm}
          <div className="button-group">
            <button className="shop-button login-button" onClick={submitForm}>
              {textChange}
            </button>
            <div className="login-option">
              <p>
                <a href="/signup">اگر عضو وبسایت نیستید ثبت نام کنید.</a>
              </p>
              <p>
                <a href="/password/forget">رمز عبور خود را فراموش کرده اید؟</a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer display={{ rights: true, info: true }} />
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { setUserData })(Signin);
