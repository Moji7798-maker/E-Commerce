import React, { useEffect, useState } from "react";
import { getCategories } from "../Admin/adminApi";
import CheckBox from "./CheckBox";
import {
  setShopProductsRedux,
  setShopDetails,
} from "../../Store/actions/userActions";
import { connect } from "react-redux";
import { filterProducts } from "./commonApi";
import RadioButton from "./RadioButton";
import { makePriceRanges } from "../../helperFunctions";
import { prices } from "../../assets/fixedPrices";

const ShopFilters = ({ setShopProductsRedux, setShopDetails, shopDetails }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState({});
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(100);
  const [size, setSize] = useState(0);
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], newPrice: [] },
  });

  const init = () => {
    getCategories().then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error);
        } else {
          setCategories(data);
        }
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const loadProducts = (newFilters) => {
    filterProducts(skip, limit, newFilters).then((data) => {
      if (data) {
        if (data.error) {
          setError(data.error);
        } else {
          setShopDetails({ ...shopDetails, size: data.size, skip: 0 });
          setShopProductsRedux(data.products);
          setSkip(0);
          setSize(data.size);
        }
      }
    });
  };

  const handleFilter = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "newPrice") {
      const priceFilter = makePriceRanges(filters);
      newFilters.filters[filterBy] = priceFilter;
    }

    setShopDetails({ ...shopDetails, filters: newFilters.filters });
    loadProducts(newFilters.filters);
    setMyFilters(newFilters);
  };

  return (
    <div className="filters">
      <div className="colors">
        <div className="title">
          <h2>برند</h2>
        </div>
        {categories && categories.length && (
          <CheckBox
            items={categories}
            handleFilter={(filters) => handleFilter(filters, "category")}
          />
        )}
      </div>
      <div className="brands">
        <div className="title">
          <h2>قیمت</h2>
        </div>
        {categories && categories.length > 0 && (
          <RadioButton
            items={prices}
            handleFilter={(filters) => handleFilter(filters, "newPrice")}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  shopDetails: state.userProducts.shopDetails,
});

export default connect(mapStateToProps, {
  setShopProductsRedux,
  setShopDetails,
})(ShopFilters);
