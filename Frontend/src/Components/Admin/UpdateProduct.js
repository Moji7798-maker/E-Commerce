import React, { useState, useRef, useEffect } from "react";
import Header from "../Common/Header";
import "../../StyleSheets/signin-signup.css";
import Footer from "../Common/Footer";
import { updateProductApi, getProduct } from "./adminApi";
import ShowNotif from "../Common/ShowNotif";
import {
  isAuth,
  fixDigit,
  setInputFilter,
  persianToLatin,
} from "../../helperFunctions";
import { connect } from "react-redux";
import GoBack from "../Common/GoBack";
import { Redirect } from "react-router-dom";
import { updateProducts } from "../../Store/actions/adminActions";

const UpdateProduct = ({ user, match, updateProducts }) => {
  const [values, setValues] = useState({
    name: "",
    newPrice: "",
    oldPrice: "",
    quantity: "",
    description: "",
    categories: [],
    category: "",
    discount: "",
    formData: "",
    textChange: "به روز رسانی محصول",
    error: {},
    message: "",
    overlay: false,
    productId: "",
    redirect: false,
  });

  const {
    name,
    newPrice,
    oldPrice,
    quantity,
    description,
    categories,
    category,
    formData,
    discount,
    error,
    textChange,
    message,
    overlay,
    productId,
    redirect,
  } = values;

  const numberInput1 = useRef(null);
  const numberInput2 = useRef(null);
  const numberInput3 = useRef(null);
  const numberInput4 = useRef(null);

  const init = (productId) => {
    setInputFilter(
      [numberInput1, numberInput2, numberInput3, numberInput4],
      function (value) {
        return /^[1234567890۱۲۳۴۵۶۷۸۹۰]*\.?[1234567890۱۲۳۴۵۶۷۸۹۰]*$/.test(
          value
        ); // Allow digits and '.' only, using a RegExp
      }
    );

    getProduct(productId).then((data) => {
      if (data) {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: data.product.name,
            description: data.product.description,
            oldPrice: data.product.oldPrice,
            newPrice: data.product.newPrice,
            quantity: data.product.quantity,
            discount: data.product.discount,
            category: data.product.category._id,
            categories: data.categories,
            productId: productId,
            formData: new FormData(),
          });
        }
      }
    });
  };

  useEffect(() => {
    const productId = match.params.productId;
    init(productId);
  }, [match.params.productId]);

  const handleChange = (name) => (e) => {
    const photoHandler = () => {
      for (let i = 0; i < e.target.files.length; i++) {
        formData.set("photo" + (i + 1), e.target.files[i]);
      }
    };
    const textHandler = (name) => {
      formData.set(name, e.target.value);
    };
    const value = name === "photos" ? photoHandler() : textHandler(name);
    setValues({
      ...values,
      error: { ...error, [name]: "" },
      [name]: value,
    });
  };

  const handleNumberChange = (name) => (e) => {
    formData.set(name, persianToLatin(fixDigit(e.target.value)));
    setValues({
      ...values,
      error: { ...error, [name]: "" },
      [name]: fixDigit(e.target.value),
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      error: {},
      message: "",
      textChange: "در حال ارسال",
      overlay: true,
      redirect: false,
    });
    updateProductApi(
      formData,
      isAuth(),
      productId,
      user.userInfo && user.userInfo._id
    ).then((data) => {
      if (data) {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            textChange: "به روز رسانی محصول",
            message: "",
            overlay: false,
            redirect: false,
          });
        } else {
          updateProducts(data.updatedProduct);
          setValues({
            ...values,
            name: "",
            oldPrice: "",
            newPrice: "",
            description: "",
            quantity: "",
            category: "",
            discount: "",
            textChange: "به روز رسانی محصول",
            error: {},
            message: data.message,
            overlay: false,
            redirect: true,
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

  const showOverlay = () => <div className="overlay"></div>;

  const updateProductForm = (
    <form>
      <div className="input-group">
        <label htmlFor="name-input">تصاویر محصول</label>
        {/* TODO: style the file button */}
        <input
          type="file"
          multiple
          accept="image/*"
          className={`input ${error.photos ? "invalid" : ""}`}
          name="photos"
          id="photos-input"
          onChange={handleChange("photos")}
        />
        {showError(error, "photos")}
      </div>
      <div className="input-group">
        <label htmlFor="name-input">نام محصول</label>
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
        <label htmlFor="description-input">توضیحات</label>
        <textarea
          className={`input ${error.description ? "invalid" : ""}`}
          id="description-input"
          value={description}
          name="description"
          onChange={handleChange("description")}
        ></textarea>
        {showError(error, "description")}
      </div>
      <div className="input-group">
        <label htmlFor="new-price-input">قیمت جدید</label>
        <input
          type="text"
          ref={numberInput1}
          className={`input ${error.newPrice ? "invalid" : ""}`}
          id="new-price-input"
          name="newPrice"
          value={newPrice}
          onChange={handleNumberChange("newPrice")}
        />
        {showError(error, "newPrice")}
      </div>
      <div className="input-group">
        <label htmlFor="old-price-input">قیمت اولیه (اختیاری)</label>
        <input
          type="text"
          ref={numberInput2}
          className={`input ${error.oldPrice ? "invalid" : ""}`}
          id="old-price-input"
          name="oldPrice"
          value={oldPrice}
          onChange={handleNumberChange("oldPrice")}
        />
        {showError(error, "oldPrice")}
      </div>

      <div className="input-group">
        <label htmlFor="quantity-input">تعداد در انبار</label>
        <input
          type="text"
          ref={numberInput3}
          className={`input ${error.quantity ? "invalid" : ""}`}
          id="quantity-input"
          name="quantity"
          value={quantity}
          onChange={handleNumberChange("quantity")}
        />
        {showError(error, "quantity")}
      </div>
      <div className="input-group">
        <label htmlFor="discount-input">درصد تخفیف (اختیاری)</label>
        <input
          type="text"
          ref={numberInput4}
          className={`input ${error.discount ? "invalid" : ""}`}
          id="discount-input"
          name="discount"
          value={discount}
          onChange={handleNumberChange("discount")}
        />
        {showError(error, "quantity")}
      </div>
      <div className="input-group">
        <label htmlFor="category-input">دسته بندی</label>
        <select
          className={`input ${error.category ? "invalid" : ""}`}
          id="category-input"
          name="category"
          value={category}
          onChange={handleChange("category")}
        >
          <option value="0">دسته بندی مورد نظر خود را انتخاب کنید</option>
          {categories &&
            categories.map((c, i) => (
              <option value={c._id} key={i}>
                {c.name}
              </option>
            ))}
        </select>
        {showError(error, "category")}
      </div>
    </form>
  );

  return (
    <>
      {redirect && <Redirect to={"/products/update"} />}
      {overlay ? showOverlay() : null}
      {message ? <ShowNotif message={message} /> : null}
      {error.notif ? <ShowNotif message={error.notif} /> : null}
      <Header
        display={{ navbar: true, mainSearch: false, features: false }}
        spaces={{ navbar: 0 }}
      />
      <GoBack address={"/products/update"} />
      <section id="create-product" className="create-product">
        <div className="create-product-content">
          <header className="products-header">
            <div className="header-title">
              <h1>به روز رسانی محصول</h1>
            </div>
          </header>
          {updateProductForm}
          <div className="button-group">
            <button
              className="shop-button register-button"
              onClick={submitForm}
              type="submit"
            >
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

export default connect(mapStateToProps, { updateProducts })(UpdateProduct);
