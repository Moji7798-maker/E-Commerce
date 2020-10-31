import React, { useState } from "react";
import Header from "../Common/Header";
import "../../StyleSheets/signin-signup.css";
import Footer from "../Common/Footer";
import { isAuth } from "../../helperFunctions";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { forget } from "./userApi";
import ShowNotif from "../Common/ShowNotif";

const ForgetPassword = ({ user }) => {
  const [formData, setFormData] = useState({
    email: "",
    error: {},
    message: "",
    textChange: "ارسال",
  });

  const { email, error, message, textChange } = formData;

  const requiredFields = [{ email }];

  const submitForm = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      error: {},
      message: "",
      textChange: "در حال ارسال",
    });
    // client side validation
    requiredFields.forEach((field) => {
      if (!field[Object.keys(field)[0]]) {
        error[String(Object.keys(field)[0])] = true;
        setFormData({ ...formData, error: error });
      }
    });

    forget({ email }).then((data) => {
      if (data) {
        if (data.error) {
          setFormData({
            ...formData,
            error: data.error,
            message: "",
            textChange: "ارسال",
          });
        } else {
          setFormData({
            ...formData,
            message: data.message,
            textChange: "ارسال",
          });
        }
      }
    });
  };

  const handleChange = (name) => (e) => {
    setFormData({
      ...formData,
      error: { ...error, [name]: "" },
      [name]: e.target.value,
    });
  };

  const showError = (error, name) => {
    return (
      <div style={{ display: error[name] ? "" : "none" }}>
        <span className="validation">{error && error[name]}</span>
      </div>
    );
  };

  const forgetPasswordForm = (
    <form onSubmit={submitForm}>
      <div className="input-group">
        <label htmlFor="email-input"> پست الکترونیک خود را وارد کنید.</label>
        <input
          type="email"
          value={email}
          onChange={handleChange("email")}
          className="input"
          id="email-input"
          name="email"
        />
        {showError(error, "email")}
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
      {message && <ShowNotif message={message} />}
      {error.notif && <ShowNotif message={error.notif} />}
      <Header
        display={{ navbar: false, mainSearch: false, features: false }}
        spaces={{ navbar: 1 }}
      />
      <section id="forget" className="forget">
        <div className="forget-content">
          {forgetPasswordForm}
          <div className="button-group">
            <button className="shop-button login-button" onClick={submitForm}>
              {textChange}
            </button>
            <div className="login-option">
              <p>
                <a href="/sigin">اگر عضو وبسایت نیستید ثبت نام کنید.</a>
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

export default connect(mapStateToProps, {})(ForgetPassword);
