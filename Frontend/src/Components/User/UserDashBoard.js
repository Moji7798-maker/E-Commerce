import React from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { Link } from "react-router-dom";

const UserDashBoard = () => {
  const userLinks = (
    <ul className="user-actions">
      <Link to="/profile/update">
        <li className="user-action update-profile">
          <span className="icon">
            <i className="fas fa-sync"></i>
          </span>
          <span className="title">به روز رسانی پروفایل </span>
        </li>
      </Link>
      <Link to="/cart">
        <li className="user-action my-cart">
          <span className="icon">
            <i className="fas fa-shopping-cart"></i>
          </span>
          <span className="title">سبد خرید </span>
        </li>
      </Link>
      <Link to="/purchases/hoistory">
        <li className="user-action purchase-history">
          <span className="icon">
            <i className="fas fa-history"></i>
          </span>
          <span className="title">تاریخچه خرید ها </span>
        </li>
      </Link>
    </ul>
  );

  const userInfo = (
    <div className="user-info">
      <h1>اطلاعات کاربر</h1>
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
        <div className="info">
          <h3 className="title">نام کاربری</h3>
          <span>moji7798</span>
        </div>
        <div className="info">
          <h3 className="title">استان محل سکونت</h3>
          <span>یزد</span>
        </div>
        <div className="info">
          <h3 className="title">شهر محل سکونت</h3>
          <span>یزد</span>
        </div>
        <div className="info">
          <h3 className="title">آدرس محل سکونت</h3>
          <span>امامشهر - خ سجاد شمالی - ک ۱۱ - پ ۱۰</span>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <Header
        display={{ navbar: true, mainSearch: false, features: false }}
        spaces={{ navbar: 1, mainSearch: 0, features: 0 }}
      />
      <section className="user-dashboard" id="user-dashboard">
        <header className="products-header manage-account">
          <div className="header-title">
            <h1>مدیریت اکانت</h1>
          </div>
        </header>
        <div className="dashboard-content">
          {userLinks}
          {userInfo}
        </div>
      </section>
      <Footer display={{ info: true, rights: true }} />
    </>
  );
};

export default UserDashBoard;
