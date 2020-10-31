import axios from "axios";
import queryString from "query-string";

export const getProducts = (limit, sortBy, order = -1) => {
  return fetch(
    `${process.env.REACT_APP_API}/api/product?order=${order}&sortBy=${sortBy}&limit=${limit}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const filterProducts = (skip, limit, filters = {}) => {
  return fetch(`${process.env.REACT_APP_API}/api/product/by/filter`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ skip, limit, filters }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getProduct = (productId) => {
  return fetch(`${process.env.REACT_APP_API}/api/product/${productId}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getPhotosLength = (productId) => {
  return fetch(
    `${process.env.REACT_APP_API}/api/product/photosLength/${productId}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getRelatedProducts = (productId) => {
  return fetch(
    `${process.env.REACT_APP_API}/api/product/related/${productId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getSearchResults = (params) => {
  const query = queryString.stringify(params);
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  axios
    .get(`${process.env.REACT_APP_API}/api/product/by/search?${query}`, {
      cancelToken: source.token,
    })
    .then((res) => res.data)
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("cancelled");
        return;
      }
      console.log(err);
    });
};

export const getSearchResults = (params, signal) => {
  const query = queryString.stringify(params);
  return fetch(`${process.env.REACT_APP_API}/api/product/by/search?${query}`, {
    method: "GET",
    signal: signal,
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
};
