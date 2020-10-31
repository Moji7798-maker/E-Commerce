import React, { useState, useEffect } from "react";
import Header from "../Common/Header";
import "../../StyleSheets/signin-signup.css";
import Footer from "../Common/Footer";
import { isAuth } from "../../helperFunctions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { reset } from "./userApi";
import ShowNotif from "../Common/ShowNotif";

const ResetPassword = ({ match, user }) => {
  const [formData, setFormData] = useState({
    newPassword: "",
    error: {},
    message: "",
    textChange: "ارسال",
    token: "",
  });

  useEffect(() => {
    const token = match.params.token;
    if (token) {
      setFormData({ ...formData, token });
    }
  }, [match.params.token, formData]);

  const { newPassword, error, message, textChange, token } = formData;

  const requiredFields = [{ newPassword }];

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

    reset({ newPassword, token }).then((data) => {
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
            newPassword: "",
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

  const resetPasswordForm = (
    <form onSubmit={submitForm}>
      <div className="input-group">
        <label htmlFor="email-input"> رمز عبور جدید خود را وارد کنید.</label>
        <input
          type="password"
          className="input"
          id="newPassword-input"
          value={newPassword}
          onChange={handleChange("newPassword")}
          name="newPassword"
        />
        {showError(error, "newPassword")}
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
      <section id="reset" className="reset">
        <div className="reset-content">
          {resetPasswordForm}
          <div className="button-group">
            <button className="shop-button login-button" onClick={submitForm}>
              {textChange}
            </button>
          </div>
          <div className="login-option">
            <p>
              <a href="/password/forget">ارسال دوباره؟</a>
            </p>
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

export default connect(mapStateToProps, {})(ResetPassword);
