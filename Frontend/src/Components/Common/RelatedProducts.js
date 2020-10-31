import React, { useEffect, useState } from "react";
import { getRelatedProducts } from "./commonApi";
import ProductCarousel from "./ProductCarousel";
import Products from "./Products";
import Product from "./Product";

const RelatedProducts = ({ product }) => {
  const [message, setMessage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);

  console.log(relatedProducts);

  const options = {
    loop: true,
    rtl: true,
    dots: false,
    nav: false,
    center: true,
    margin: 10,
    autoplay: true,
    // stagePadding: 40,
    responsive: {
      0: {
        items: 1,
      },
      568: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  };

  const init = () => {
    getRelatedProducts(product._id).then((data) => {
      if (data) {
        if (data.message) {
          setMessage(data.message);
        } else {
          setRelatedProducts(data);
          setMessage("");
        }
      }
    });
  };

  useEffect(() => {
    Object.keys(product).length > 0 && init();
  }, [product]);

  return (
    <Products
      classname={"related-products-section"}
      title={"محصولات مرتبط"}
      archiveButton={false}
      space={0}
    >
      {relatedProducts.length > 0 && !message && (
        <ProductCarousel
          options={options}
          classname={"owl-carousel related-products-pics"}
        >
          {relatedProducts.map((p, i) => (
            <Product
              key={i}
              product={p}
              imageStyle={{ maxWidth: "120px", width: "100%" }}
            />
          ))}
        </ProductCarousel>
      )}
      {message && <div>محصول مرتبطی وجود ندارد</div>}
    </Products>
  );
};

export default RelatedProducts;
