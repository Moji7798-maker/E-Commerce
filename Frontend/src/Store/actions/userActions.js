import { C } from "../constant";

export const setUserData = (data) => ({
  type: C.SET_USER_DATA,
  payload: data,
});

export const signUserOut = () => ({
  type: C.SET_USER_DATA,
});

export const setBestSellersRedux = (data) => ({
  type: C.SET_BEST_SELLERS,
  payload: data,
});

export const setNewArrivalsRedux = (data) => ({
  type: C.SET_NEW_ARRIVALS,
  payload: data,
});

export const setShopProductsRedux = (data) => ({
  type: C.SET_SHOP_PRODUCTS,
  payload: data,
});

export const setCartItem = (data) => ({
  type: C.SET_CART_ITEM,
  payload: data,
});

export const updateCartItem = (data) => ({
  type: C.UPDATE_CART_ITEM,
  payload: data,
});

export const deleteCartItem = (data) => ({
  type: C.DELETE_CART_ITEM,
  payload: data,
});

export const setShopDetails = (data) => ({
  type: C.SET_SHOP_FILTERS,
  payload: data,
});
