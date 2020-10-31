import React, { useState, useEffect } from "react";
import { readProfile, updateProfile } from "./userApi";
import { connect } from "react-redux";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { isAuth } from "../../helperFunctions";
import iranProvinces from "../../assets/minifiedprovinces.json";
import { setUserData } from "../../Store/actions/userActions";
import { Redirect } from "react-router-dom";
import GoBack from "../Common/GoBack";

const UpdateProfile = ({ user, setUserData, history }) => {
  const [formData, setFormData] = useState({
    userName: "",
    phoneNumberIR: "",
    email: "",
    provinces: [],
    counties: [],
    province: "",
    county: "",
    address: "",
    textChange: "ارسال",
    error: {},
  });

  const {
    userName,
    phoneNumberIR,
    email,
    provinces,
    counties,
    province,
    county,
    address,
    textChange,
    error,
  } = formData;

  const init = (token, provinces) => {
    readProfile(user.userInfo._id, token).then((data) => {
      if (data) {
        if (data.error) {
          setFormData({ ...formData, error: data.error });
        } else {
          const counties = Array.from(
            new Set(
              iranProvinces
                .filter((p, i) => p.province_name === data.province)
                .map((p, i) => p.county_name)
            )
          );
          setFormData({
            ...formData,
            userName: data.userName || "",
            phoneNumberIR: data.phoneNumberIR || "",
            email: data.email || "",
            province: data.province || "",
            county: data.county || "",
            address: data.address || "",
            provinces,
            counties,
          });
        }
      }
    });
  };

  const populateSelectors = () => {
    const provinces = Array.from(
      new Set(iranProvinces.map((p, i) => p.province_name))
    );
    return provinces;
  };

  useEffect(() => {
    const token = isAuth();
    const provinces = populateSelectors();
    init(token, provinces);
  }, [user.userInfo]);

  const handleChange = (name) => (e) => {
    if (name === "province") {
      const counties = Array.from(
        new Set(
          iranProvinces
            .filter((p, i) => p.province_name === e.target.value)
            .map((p, i) => p.county_name)
        )
      );
      setFormData({ ...formData, counties, province: e.target.value });
    } else {
      setFormData({
        ...formData,
        error: { ...error, [name]: "" },
        [name]: e.target.value,
      });
    }
  };

  const showError = (error, name) => {
    return (
      <div style={{ display: error[name] ? "" : "none" }}>
        <span className="validation">{error && error[name]}</span>
      </div>
    );
  };

  const submitForm = (e) => {
    e.preventDefault();
    const token = isAuth();
    setFormData({
      ...formData,
      error: {},
      textChange: "در حال ارسال",
    });
    updateProfile(user.userInfo._id, token, {
      userName,
      email,
      phoneNumber: phoneNumberIR,
      province,
      county,
      address,
    }).then((data) => {
      if (data) {
        if (data.error) {
          setFormData({
            ...formData,
            error: data.error,
            textChange: "ارسال",
          });
        } else {
          setUserData(data);
          setFormData({ ...formData, textChange: "ارسال" });
          history.push("/user/dashboard");
        }
      }
    });
  };

  const updateForms = (
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
        />
        {showError(error, "email")}
      </div>
      <div className="input-group">
        <label htmlFor="userName-input"> نام کاربری</label>
        <input
          type="text"
          className="input"
          id="userName-input"
          name="userName"
          value={userName}
          onChange={handleChange("userName")}
        />
        {showError(error, "userName")}
      </div>
      <div className="input-group">
        <label htmlFor="phoneNumberIR-input">تلفن همراه</label>
        <input
          type="text"
          className="input"
          id="phoneNumberIR-input"
          name="phoneNumber"
          value={phoneNumberIR}
          onChange={handleChange("phoneNumberIR")}
        />
        {showError(error, "phoneNumberIR")}
      </div>
      <div className="input-group">
        <label htmlFor="province-input"> استان محل سکونت</label>
        <select
          className="input"
          name="province"
          value={province}
          id="province-input"
          onChange={handleChange("province")}
        >
          <option value="0">استان خود را انتخاب کنید</option>
          {provinces.map((p, i) => (
            <option key={i} value={p}>
              {p}
            </option>
          ))}
        </select>
        {showError(error, "province")}
      </div>
      <div className="input-group">
        <label htmlFor="countiy-input"> شهر محل سکونت</label>
        <select
          className="input"
          name="county"
          value={county}
          id="countiy-input"
          onChange={handleChange("county")}
        >
          <option value="0">شهر خود را انتخاب کنید</option>
          {counties.map((p, i) => (
            <option key={i} value={p}>
              {p}
            </option>
          ))}
        </select>
        {showError(error, "county")}
      </div>
      <div className="input-group">
        <label htmlFor="address-input">آدرس محل سکونت</label>
        <input
          type="text"
          className="input"
          id="address-input"
          name="address"
          value={address}
          onChange={handleChange("address")}
        />
        {showError(error, "address")}
      </div>
    </form>
  );

  return (
    <>
      <Header
        display={{ navbar: true, mainSearch: false, features: false }}
        spaces={{ navbar: 1 }}
      />
      <GoBack address="/user/dashboard" />
      <section id="update-profile" className="update-profile">
        <div className="update-profile-content">
          <header className="products-header">
            <div className="header-title">
              <h1>به روز رسانی</h1>
            </div>
          </header>
          {updateForms}
          <div className="button-group">
            <button className="shop-button login-button" onClick={submitForm}>
              {textChange}
            </button>
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

export default connect(mapStateToProps, { setUserData })(UpdateProfile);
