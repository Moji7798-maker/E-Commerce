import React from "react";
import { connect } from "react-redux";
import { fixDigit } from "../../helperFunctions";

const CartDetails = ({ cart }) => {
  const getTotalPrice = () => {
    return cart.reduce((t, c) => t + c.newPrice * c.count, 0);
  };

  const priceToPay = () => {
    //   const tax = 5;
    //   const taxPrice = cart.reduce((t, c) => t + (c.newPrice + c.newPrice * tax));
    const finalPrice = cart.reduce(
      (t, c) => t + (c.newPrice - c.newPrice * (c.discount / 100)) * c.count,
      0
    );

    const discountPrice = cart.reduce(
      (t, c) => t + c.newPrice * (c.discount / 100) * c.count,
      0
    );

    return { finalPrice, discountPrice };
  };

  return (
    <div className="preview">
      <div className="discount-code">
        <input
          type="text"
          className="input discount-input"
          placeholder="کوپن تخفیف خود را بنویسید..."
        />
        <button className="shop-button discount-button">اعمال</button>
      </div>
      <table className="preview-table">
        <tbody>
          <tr>
            <td>جمع کل</td>
            <td className="total-price">{fixDigit(getTotalPrice())} تومان</td>
          </tr>
          <tr>
            <td>مالیات</td>
            <td className="tax">
              <span>۰</span> تومان
            </td>
          </tr>
          <tr>
            <td>تخفیف</td>
            <td className="cart-discount">
              <span>{fixDigit(priceToPay().discountPrice)}</span> تومان
            </td>
          </tr>
          <tr>
            <td>قابل پرداخت</td>
            <td className="payment-price">
              <span>{fixDigit(priceToPay().finalPrice)}</span> تومان
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, {})(CartDetails);
