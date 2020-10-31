import React, { useState, useEffect } from "react";
import Header from "../Common/Header";
import "../../StyleSheets/signin-signup.css";
import Footer from "../Common/Footer";
import { updateCategoryApi } from "./adminApi";
import ShowNotif from "../Common/ShowNotif";
import { isAuth } from "../../helperFunctions";
import { connect } from "react-redux";
import GoBack from "../Common/GoBack";
import { updateCategoryAction } from "../../Store/actions/adminActions";

const UpdateCategory = ({
  user,
  match,
  categoriesRedux,
  updateCategoryAction,
  history,
}) => {
  const [formData, setFormData] = useState({
    categoryName: "",
    textChange: "ارسال",
    error: {},
    message: "",
    categoryId: "",
  });

  const { categoryName, error, textChange, message, categoryId } = formData;

  useEffect(() => {
    const categoryId = match.params.categoryId;
    const categoryName = categoriesRedux.find((c) => c._id === categoryId).name;
    console.log(categoryName, categoryId);
    setFormData({ ...formData, categoryId, categoryName });
  }, []);

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
    updateCategoryApi(
      { categoryName },
      isAuth(),
      categoryId,
      user.userInfo && user.userInfo._id
    ).then((data) => {
      if (data) {
        if (data.error) {
          setFormData({
            ...formData,
            error: data.error,
            textChange: "ارسال",
            message: "",
          });
        } else {
          console.log(data.category);
          updateCategoryAction(data.category);
          history.push("/category/all");
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

  const updateCategoryForm = (
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
      <GoBack address={"/category/all"} />
      <section id="createCategory" className="createCategory">
        <div className="createCategory-content">
          <header className="products-header">
            <div className="header-title">
              <h1>به روز رسانی دسته بندی </h1>
            </div>
          </header>
          {updateCategoryForm}
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
  categoriesRedux: state.categories,
});

export default connect(mapStateToProps, { updateCategoryAction })(
  UpdateCategory
);
