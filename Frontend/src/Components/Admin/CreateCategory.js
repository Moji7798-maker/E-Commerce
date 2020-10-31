import React, { useState } from "react";
import Header from "../Common/Header";
import "../../StyleSheets/signin-signup.css";
import Footer from "../Common/Footer";
import { createCategory } from "./adminApi";
import ShowNotif from "../Common/ShowNotif";
import { isAuth } from "../../helperFunctions";
import { connect } from "react-redux";
import GoBack from "../Common/GoBack";
import { addCategory } from "../../Store/actions/adminActions";

const CreateCategory = ({ user, addCategory }) => {
  const [formData, setFormData] = useState({
    categoryName: "",
    textChange: "ارسال",
    error: {},
    success: false,
    message: "",
  });

  const { categoryName, error, textChange, message } = formData;

  const requiredFields = [{ categoryName }];

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
      message: "",
    });
    // client side validation
    requiredFields.forEach((field) => {
      if (!field[Object.keys(field)[0]]) {
        error[String(Object.keys(field)[0])] = true;
        setFormData({ ...formData, error: error });
      }
    });
    createCategory(
      { categoryName },
      isAuth(),
      user.userInfo && user.userInfo._id
    )
      .then((data) => {
        if (data) {
          if (data.error) {
            setFormData({
              ...formData,
              error: data.error,
              success: false,
              textChange: "ارسال",
              message: "",
            });
          } else {
            addCategory(data.category);
            setFormData({
              ...formData,
              message: data.message,
              textChange: "",
              textChange: "ارسال",
              categoryName: "",
              error: {},
            });
          }
        }
      })
      .catch((err) =>
        // {setFormData({
        //     ...formData,
        //     error: err
        // })}
        console.log(err)
      );
  };

  const showError = (error, name) => {
    return (
      <div style={{ display: error[name] ? "" : "none" }}>
        <span className="validation">{error && error[name]}</span>
      </div>
    );
  };

  const createCategoryForm = (
    <form>
      <div className="input-group">
        <label htmlFor="categoryName-input"> نام دسته بندی</label>
        <input
          type="text"
          className="input"
          id="categoryName-input"
          name="categoryName"
          value={categoryName}
          onChange={handleChange("categoryName")}
        />
        {showError(error, "categoryName")}
      </div>
    </form>
  );

  return (
    <>
      {message ? <ShowNotif message={message} /> : null}
      {error.notif ? <ShowNotif message={error.notif} /> : null}
      <Header
        display={{ navbar: true, mainSearch: false, features: false }}
        spaces={{ navbar: 0 }}
      />
      <GoBack address={"/admin/dashboard"} />
      <section id="createCategory" className="createCategory">
        <div className="createCategory-content">
          <header className="products-header">
            <div className="header-title">
              <h1>ساخت دسته بندی جدید</h1>
            </div>
          </header>
          {createCategoryForm}
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

export default connect(mapStateToProps, { addCategory })(CreateCategory);
