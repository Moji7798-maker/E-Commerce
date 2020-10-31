import React, { useEffect, useState } from "react";
import DisplayImage from "../Common/DisplayImage";
import { fixDigit, addItemToCart } from "../../helperFunctions";
import { getPhotosLength } from "./commonApi";
import { SRLWrapper } from "simple-react-lightbox";
import CartModal from "../Helper/CartModal";
import { connect } from "react-redux";
import { setCartItem, updateCartItem } from "../../Store/actions/userActions";

const UserProductItem = ({ product, setCartItem, updateCartItem }) => {
  const [photosLength, setPhotosLength] = useState(0);
  const [modal, setModal] = useState(false);

  const init = (product) => {
    getPhotosLength(product._id).then((data) => {
      if (data) {
        setPhotosLength(data);
      }
    });
  };

  useEffect(() => {
    Object.keys(product).length > 0 && init(product);
  }, [product]);

  const addToCart = (product) => (e) => {
    addItemToCart(product, (newItem) => {
      if (newItem.count === 1) {
        setCartItem(newItem);
      } else {
        updateCartItem(newItem);
      }
      setModal(true);
    });
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <>
      {modal && <CartModal closeModal={closeModal} />}
      {Object.keys(product).length > 0 && (
        <section
          id="product-details-section"
          className="product-details-section"
        >
          <div className="content">
            <div className="product-details-top">
              <div className="product-pic">
                <figure className="main-pic">
                  <div className="gallery big">
                    <DisplayImage
                      product={product}
                      url="product"
                      style={{ maxWidth: "200px", width: "100%" }}
                    />
                  </div>
                </figure>
                <SRLWrapper>
                  {photosLength &&
                    [...Array(photosLength - 1)].map((a, i) => (
                      <DisplayImage
                        url="product"
                        key={i}
                        product={product}
                        style={{ maxWidth: "70px", width: "100%" }}
                        index={i + 1}
                      />
                    ))}
                </SRLWrapper>
              </div>

              <div className="product-info">
                <div className="row row-1">
                  <h1 className="product-title">{product.name}</h1>
                  <div className="stars">
                    <span className="star selected"></span>
                    <span className="star selected"></span>
                    <span className="star selected"></span>
                    <span className="star"></span>
                    <span className="star"></span>
                  </div>
                </div>
                <div className="row row-2">
                  <div className="prices">
                    {product.oldPrice ? (
                      <span className="old-price">
                        {fixDigit(product.oldPrice)}
                      </span>
                    ) : (
                      <span className="old-price hidden">
                        {product.oldPrice}
                      </span>
                    )}
                    <span className="new-price">
                      {fixDigit(product.newPrice)} تومان
                    </span>
                  </div>
                  <div className="discount">
                    <span className="discount-percentage-product-item">
                      {fixDigit(product.discount)}٪
                    </span>
                    <span className="shade">تخفیف</span>
                  </div>
                </div>
                <div className="row row-3">
                  <button
                    onClick={addToCart(product)}
                    className="shop-button add-to-cart-button"
                  >
                    <span>
                      <i className="fas fa-shopping-cart"></i>
                    </span>
                    <span>افزودن به سبد خرید</span>
                  </button>
                  <div className="favorite">
                    <span>
                      <i className="far fa-heart"></i>
                    </span>
                    <span>افزودن به علاقه مندی</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="line"></div>
            <div className="product-details-bottom">
              <p>{product.description}</p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  cartRedux: state.cart,
});

export default connect(mapStateToProps, { setCartItem, updateCartItem })(
  UserProductItem
);
