import React, { useState, useEffect } from "react";
import { getProducts, deleteProductApi } from "./adminApi";
import ShowNotif from "../Common/ShowNotif";
import ProductItem from "./AdminProductItem";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import "../../StyleSheets/category.css";
import "../../StyleSheets/global.css";
import { connect } from "react-redux";
import GoBack from "../Common/GoBack";
import { isAuth } from "../../helperFunctions";
import { setProducts, deleteProduct } from "../../Store/actions/adminActions";

const ViewProducts = ({ user, setProducts, productsRedux, deleteProduct }) => {
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
    getProducts(20).then((data) => {
      if (data) {
        if (data.error) {
          setFormData({
            ...formData,
            error: data.error,
            overlay: false,
            message: "",
          });
        } else {
          setProducts(data);
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
    if (productsRedux.length === 0) {
      init();
    }
  }, []);

  const onDelete = (id) => {
    console.log(id, user.userInfo._id);
    setFormData({ ...formData, overlay: true, error: {}, message: "" });
    deleteProductApi(isAuth(), id, user.userInfo && user.userInfo._id).then(
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
            deleteProduct(id);
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
      <section className="all-products" id="all-products">
        <header className="products-header">
          <div className="header-title">
            <h1>محصولات</h1>
          </div>
        </header>
        <div className="products">
          {productsRedux && productsRedux.length > 0 ? (
            productsRedux.map((product, i) => (
              <ProductItem key={i} product={product} onDelete={onDelete} />
            ))
          ) : (
            <div>محصولی وجود ندارد</div>
          )}
        </div>
      </section>
      <Footer display={{ info: true, rights: true }} />
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  productsRedux: state.adminProducts,
});

export default connect(mapStateToProps, { setProducts, deleteProduct })(
  ViewProducts
);
