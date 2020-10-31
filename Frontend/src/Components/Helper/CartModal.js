import React, { useState } from "react";
import "../../StyleSheets/modal.css";
import { Link } from "react-router-dom";

const CartModal = ({ closeModal = (f) => f }) => {
  const [toggleModal, setToggleModal] = useState(true);

  const closeModalHandler = (e) => {
    setToggleModal(false);
    closeModal();
  };
  return (
    toggleModal && (
      <div className={`modal`}>
        <div className="modal-content">
          <header className="modal-header">
            <span className="modal-title">انجام شد</span>
            <span className="modal-close-btn" onClick={closeModalHandler}>
              &times;
            </span>
          </header>
          <div className="modal-body">
            <div className="modal-instruction">
              <p>محصول با موفقیت به سبدخرید اضافه شد.</p>
              <p>
                برای ثبت نهایی سفارش بر روی دکمه‌ی مشاهده سبدخرید کلیک کنید و
                برای افزودن دیگر محصولات به سبدخرید خود، بر روی دکمه‌ی ادامه
                کلیک کنید.
              </p>
            </div>
            <div className="modal-btns">
              <button
                className="shop-button continue-button"
                onClick={closeModalHandler}
              >
                ادامه
              </button>
              <Link to="/cart">
                <button className="shop-button gotocart-button">
                  مشاهده سبد خرید
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CartModal;
