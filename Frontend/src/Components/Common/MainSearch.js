import React, { useState, useRef, useEffect } from "react";
import useApi from "../Helper/useApi";
import axios from "axios";
import queryString from "query-string";
import DisplayImage from "./DisplayImage";
import { Link } from "react-router-dom";

const MainSearch = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  let cancel = useRef();

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
        setSearchResult(res.data);
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

  useEffect(() => {
    if (search !== "") {
      getSearchResults({ search });
    }
  }, [search]);

  const searchInput = (
    <>
      <h1 className="search-title">محصول مورد نظر خود را جستجو کنید.</h1>
      <div className="search-box">
        <span className="search-icon">
          <i className="fas fa-search"></i>
        </span>
        <input
          type="text"
          name="search-products"
          id="search-products"
          value={search}
          onChange={handleChange}
          placeholder="جستجو کنید..."
        />
      </div>
      <div className="search-results">
        <ul className="search-list">
          {searchResult &&
            searchResult.length > 0 &&
            search &&
            searchResult.map((p, i) => (
              <Link to={`product/${p._id}`}>
                <li key={i} className="search-item">
                  <DisplayImage
                    product={p}
                    url={"product"}
                    style={{ maxWidth: "50px", width: "100%" }}
                  />
                  <span className="search-item-name">{p.name}</span>
                </li>
              </Link>
            ))}
          {/* {searchResult && searchResult.length === 0 && !search && (
            <li className="search-item">
              <span className="search-item-name">
                محصولی با این مشخصات وجود ندارد
              </span>
            </li>
          )} */}
        </ul>
      </div>
    </>
  );

  return (
    <div className="search-products-section">
      <div className="search-products-content">{searchInput}</div>
    </div>
  );
};

export default MainSearch;
