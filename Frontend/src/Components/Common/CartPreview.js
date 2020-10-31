import React from "react";
import { connect } from "react-redux";
import DisplayImage from "./DisplayImage";
import { fixDigit, deletefromCart } from "../../helperFunctions";
import { Link } from "react-router-dom";
import { deleteCartItem } from "../../Store/actions/userActions";

const CartPreview = ({ cart, deleteCartItem }) => {
  const deleteItem = (item) => (e) => {
    deletefromCart(item, (deletedItem) => {
      deleteCartItem(deletedItem);
    });
  };

  return (
    <div className="cart-preview">
      {cart.length > 0 ? (
        cart.map((p, i) => (
          <div key={i} className="cart-item-preview">
            <DisplayImage
              product={p}
              url={"product"}
              style={{ maxWidth: "80px", width: "100%" }}
            />
            <div className="cart-item-details">
              <div className="cart-item-name">{p.name}</div>
              <div className="cart-item-price">
                {fixDigit(p.newPrice)} تومان
              </div>
              <div className="cart-item-remove" onClick={deleteItem(p)}>
                <span>حذف</span>
                <span className="cart-item-remove-icon">
                  <i className="fas fa-times"></i>
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>محصولی در کارت وجود ندارد</div>
      )}
      <div className="cart-preview-btn">
        <Link to="/cart">
          <button className="shop-button">ثبت و نهایی کردن سفارش</button>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, { deleteCartItem })(CartPreview);
