import React from "react";
import "../../StyleSheets/dashboard.css";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import { Link } from "react-router-dom";

const AdminDashBoard = () => {
  const adminLinks = (
    <ul className="admin-actions">
      <Link to="/category/all">
        <li className="admin-action view-categories">
          <span className="icon">
            <i className="fas fa-list"></i>
          </span>
          <span className="title">مشاهده دسته بندی ها</span>
        </li>
      </Link>
      <Link to="/product/create">
        <li className="admin-action create-product">
          <span className="icon">
            <i className="fas fa-plus"></i>
          </span>
          <span className="title">ساخت محصول جدید</span>
        </li>
      </Link>
      <Link to="/create/category">
        <li className="admin-action create-category">
          <span className="icon">
            <i className="fas fa-plus"></i>
          </span>
          <span className="title">ساخت دسته جدید</span>
        </li>
      </Link>
      <Link to="/products/update">
        <li className="admin-action update-products">
          <span className="icon">
            <i className="fas fa-sync"></i>
          </span>
          <span className="title">مشاهده محصولات</span>
        </li>
      </Link>
    </ul>
  );

  const adminInfo = (
    <div className="admin-info">
      <h1>اطلاعات ادمین</h1>
      <div className="infos">
        <div className="info">
          <h3 className="title">نام و نام خانوادگی</h3>
          <span>مجتبی مسلمان</span>
        </div>
        <div className="info">
          <h3 className="title">پست الکترونیک</h3>
          <span>sampad.mojtaba@gmail.com</span>
        </div>
        <div className="info">
          <h3 className="title">تلفن همراه</h3>
          <span>+۹۸۹۱۴۰۷۱۵۵۲۵</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Header
        display={{ navbar: true, mainSearch: false, features: false }}
        spaces={{ navbar: 0, mainSearch: 0, features: 0 }}
      />
      <section className="admin-dashboard" id="admin-dashboard">
        <header className="products-header manage-account">
          <div className="header-title">
            <h1>مدیریت سایت</h1>
          </div>
        </header>
        <div className="blank-space-40"></div>
        <div className="dashboard-content">
          {adminLinks}
          {adminInfo}
        </div>
      </section>
      <Footer display={{ info: true, rights: true }} />
    </>
  );
};

export default AdminDashBoard;
