import React, { useState } from "react";
import DisplayImage from "./DisplayImage";
import { fixDigit, updateCart, deletefromCart } from "../../helperFunctions";
import { connect } from "react-redux";
import {
  updateCartItem,
  deleteCartItem,
} from "../../Store/actions/userActions";

const CartItem = ({ cartitem, updateCartItem, deleteCartItem }) => {
  const [count, setCount] = useState(cartitem.count);

  const handleChange = (item) => (e) => {
    setCount(e.target.value);
    updateCart(item, e.target.value, (updatedItem) => {
      updateCartItem(updatedItem);
    });
  };

  const deleteItem = (item) => (e) => {
    deletefromCart(item, (deletedItem) => {
      deleteCartItem(deletedItem);
    });
  };

  const itemTotal = () => {
    return cartitem.newPrice * cartitem.count;
  };

  return (
    <tr>
      <td className="cart-item-pic">
        <DisplayImage
          product={cartitem}
          url={"product"}
          style={{ maxWidth: "150px", width: "100%" }}
        />
      </td>
      <td className="cart-item-info">
        <div className="wrapper">
          <h2 className="cart-item-name">{cartitem.name}</h2>
          <small className="cart-item-code">کد: ۱۰۱۱۶۳۵۰۸</small>
        </div>
      </td>
      <td className="cart-item-price-info">
        <div className="wrapper">
          <div className="cart-item-amount">
            <span className="prepend">تعداد</span>
            <input
              type="number"
              className="number-input"
              min="1"
              step="1"
              value={count}
              onChange={handleChange(cartitem)}
              lang="fa"
            />
            <span className="append">
              <i className="fas fa-check"></i>
            </span>
          </div>
          <div className="cart-item-price-overview">
            قیمت: <span>{fixDigit(cartitem.newPrice)} تومان</span>
          </div>
          <button className="cart-item-delete" onClick={deleteItem(cartitem)}>
            <span>&times;</span>
            <span>حذف</span>
          </button>
        </div>
      </td>
      <td className="cart-item-total">
        <div className="wrapper">
          <span>جمع</span>
          <span className="total-price">{fixDigit(itemTotal())} تومان</span>
        </div>
      </td>
    </tr>
  );
};

export default connect(null, { updateCartItem, deleteCartItem })(CartItem);
