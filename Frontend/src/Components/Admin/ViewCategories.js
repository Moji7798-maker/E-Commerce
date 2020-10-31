import React, { useState, useEffect } from "react";
import { getCategories, deleteCategoryApi } from "./adminApi";
import ShowNotif from "../Common/ShowNotif";
import CategoryItem from "./CategoryItem";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import "../../StyleSheets/category.css";
import "../../StyleSheets/global.css";
import { connect } from "react-redux";
import {
  setCategories,
  deleteCategory,
} from "../../Store/actions/adminActions";
import GoBack from "../Common/GoBack";
import { isAuth } from "../../helperFunctions";

const ViewCategories = ({
  setCategories,
  categoriesRedux,
  user,
  deleteCategory,
}) => {
  const [formData, setFormData] = useState({
    error: {},
    overlay: false,
    message: "",
  });

  const { error, overlay, message } = formData;

  const init = () => {
    setFormData({
      ...formData,
      error: {},
      overlay: true,
      message: "",
    });
    getCategories().then((data) => {
      if (data) {
        if (data.error) {
          setFormData({
            ...formData,
            error: data.error,
            overlay: false,
            message: "",
          });
        } else {
          setCategories(data);
          setFormData({
            ...formData,
            error: {},
            overlay: false,
          });
        }
      }
    });
  };

  const showOverlay = () => <div className="overlay"></div>;

  useEffect(() => {
    if (categoriesRedux.length === 0) {
      init();
    }
  }, []);

  const onDelete = (id) => {
    setFormData({ ...formData, overlay: true, error: {}, message: "" });
    deleteCategoryApi(isAuth(), id, user.userInfo && user.userInfo._id).then(
      (data) => {
        if (data) {
          if (data.error) {
            setFormData({
              ...formData,
              error: data.error,
              overlay: false,
              message: "",
            });
          } else {
            deleteCategory(id);
            setFormData({
              ...formData,
              overlay: false,
              message: data.message,
            });
          }
        }
      }
    );
  };

  return (
    <>
      {overlay ? showOverlay() : null}
      {error.notif ? <ShowNotif message={error.notif} /> : null}
      {message ? <ShowNotif message={message} /> : null}
      <Header
        display={{ navbar: true, mainSearch: false, features: false }}
        spaces={{ navbar: 1, mainSearch: 0, features: 0 }}
      />
      <GoBack address={"/admin/dashboard"} />
      <section className="all-categories" id="all-categories">
        <header className="products-header">
          <div className="header-title">
            <h1>دسته بندی ها</h1>
          </div>
        </header>
        <div className="categories">
          {categoriesRedux && categoriesRedux.length > 0 ? (
            categoriesRedux.map((category, i) => (
              <CategoryItem key={i} category={category} onDelete={onDelete} />
            ))
          ) : (
            <div>دسته بندی ای وجود ندارد</div>
          )}
        </div>
      </section>
      <Footer display={{ info: true, rights: true }} />
    </>
  );
};

const mapStateToProps = (state) => ({
  categoriesRedux: state.categories,
  user: state.user,
});

export default connect(mapStateToProps, { setCategories, deleteCategory })(
  ViewCategories
);
