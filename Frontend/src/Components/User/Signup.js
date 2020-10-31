import React, { useState } from "react";
import Header from "../Common/Header";
import "../../StyleSheets/signin-signup.css";
import Footer from "../Common/Footer";
import { signup } from "./userApi";
import ShowNotif from "../Common/ShowNotif";
import { isAuth } from "../../helperFunctions";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Signup = ({ user }) => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
    textChange: "ثبت نام",
    error: {},
    success: false,
    message: "",
  });

  const {
    name,
    lastName,
    email,
    phoneNumber,
    userName,
    password,
    confirmPassword,
    error,
    textChange,
    message,
  } = formData;

  const requiredFields = [
    { name },
    { lastName },
    { email },
    { phoneNumber },
    { password },
  ];

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
    if (password !== confirmPassword) {
      error.confirmPassword = "رمز عبور با تکرار آن مطابقت ندارد";
      setFormData({ ...formData, error: error });
    } else {
      signup({ name, lastName, phoneNumber, email, userName, password }).then(
        (data) => {
          if (data) {
            if (data.error) {
              setFormData({
                ...formData,
                error: data.error,
                success: false,
                textChange: "ثبت نام",
              });
            } else {
              setFormData({
                ...formData,
                name: "",
                lastName: "",
                phoneNumber: "",
                email: "",
                userName: "",
                password: "",
                confirmPassword: "",
                textChange: "ثبت نام",
                error: {},
                message: data.message,
              });
            }
          }
        }
      );
    }
  };

  const showError = (error, name) => {
    return (
      <div style={{ display: error[name] ? "" : "none" }}>
        <span className="validation">{error && error[name]}</span>
      </div>
    );
  };

  const signUpForm = (
    <form>
      <div className="input-group">
        <label htmlFor="name-input">نام </label>
        <input
          type="text"
          className={`input ${error.name ? "invalid" : ""}`}
          name="name"
          id="name-input"
          value={name}
          onChange={handleChange("name")}
        />
        {showError(error, "name")}
      </div>
      <div className="input-group">
        <label htmlFor="lastName-input">نام خانوادگی </label>
        <input
          type="text"
          className={`input ${error.lastName ? "invalid" : ""}`}
          id="lastName-input"
          value={lastName}
          name="lastName"
          onChange={handleChange("lastName")}
        />
        {showError(error, "lastName")}
      </div>
      <div className="input-group">
        <label htmlFor="phone-number-input">شماره موبایل</label>
        <input
          type="text"
          className={`input ${error.phoneNumber ? "invalid" : ""}`}
          id="phone-number-input"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handleChange("phoneNumber")}
        />
        {showError(error, "phoneNumber")}
      </div>
      <div className="input-group">
        <label htmlFor="email-input">پست الکترونیک</label>
        <input
          type="email"
          className={`input ${error.email ? "invalid" : ""}`}
          id="email-input"
          name="email"
          value={email}
          onChange={handleChange("email")}
        />
        {showError(error, "email")}
      </div>

      <div className="input-group">
        <label htmlFor="username-input">نام کاربری (*اختیاری)</label>
        <input
          type="text"
          className={`input ${error.userName ? "invalid" : ""}`}
          id="username-input"
          name="userName"
          value={userName}
          onChange={handleChange("userName")}
        />
        {showError(error, "userName")}
      </div>
      <div className="input-group">
        <label htmlFor="password-input">رمز عبور</label>
        <input
          type="password"
          className={`input ${error.password ? "invalid" : ""}`}
          id="password-input"
          name="password"
          value={password}
          onChange={handleChange("password")}
        />
        {showError(error, "password")}
      </div>
      <div className="input-group">
        <label htmlFor="confirm-password-input">تکرار رمز عبور</label>
        <input
          type="password"
          className={`input ${error.confirmPassword ? "invalid" : ""}`}
          id="confirm-password-input"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange("confirmPassword")}
        />
        {showError(error, "confirmPassword")}
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
      {message ? <ShowNotif message={message} /> : null}
      {error.notif ? <ShowNotif message={error.notif} /> : null}
      <Header
        display={{ navbar: true, mainSearch: false, features: false }}
        spaces={{ navbar: 0 }}
      />
      <section id="signup" className="signup">
        <div className="signup-content">
          <header className="products-header best-sellers-header">
            <div className="header-title">
              <h1>ثبت نام</h1>
            </div>
          </header>
          {signUpForm}
          <div className="button-group">
            <button
              className="shop-button register-button"
              onClick={submitForm}
              type="submit"
            >
              {textChange}
            </button>
            <div className="register-option">
              <span>
                <a href="/signin">آیا عضو وب‌سایت هستید؟</a>
              </span>
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

export default connect(mapStateToProps, {})(Signup);
