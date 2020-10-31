import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { setShopProductsRedux } from "../../Store/actions/userActions";
import queryString from "query-string";
import axios from "axios";

const ShopSearch = ({ setShopProductsRedux }) => {
  const [search, setSearch] = useState("");

  let cancel = useRef(null);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const getSearchResults = (params) => {
    const query = queryString.stringify(params);

    console.log(cancel);
    if (cancel.current) {
      cancel.current.cancel("cancel");
    }
    cancel.current = axios.CancelToken.source();
    axios
      .get(`${process.env.REACT_APP_API}/api/product/by/search?${query}`, {
        cancelToken: cancel.current.token,
      })
      .then((res) => {
        setShopProductsRedux(res.data);
      })
      .catch((error) => {
        console.log(axios.isCancel(error));
        if (axios.isCancel(error)) {
          console.log("cancelled");
          return;
        }
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getSearchResults({ search });
    setSearch("");
  };

  return (
    <div className="shop-search-section">
      <div className="content">
        <form onSubmit={handleSubmit} className="shop-search">
          <input
            type="text"
            name="search"
            id="search"
            value={search}
            className="input"
            onChange={handleChange}
            placeholder="جستجو کنید"
          />
          <span className="addon">
            <button className="shop-button search-button" type="submit">
              جستجو
            </button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default connect(null, { setShopProductsRedux })(ShopSearch);
