import { C } from "../constant";

export const setCategories = (data) => ({
  type: C.SET_CATEGORIES,
  payload: data,
});

export const deleteCategory = (data) => ({
  type: C.DELETE_CATEGORY,
  payload: data,
});

export const updateCategoryAction = (data) => ({
  type: C.UPDATE_CATEGORY,
  payload: data,
});

export const addCategory = (data) => ({
  type: C.ADD_CATEGORY,
  payload: data,
});

export const updateProducts = (data) => ({
  type: C.UPDATE_PRODUCTS,
  payload: data,
});

export const setProducts = (data) => ({
  type: C.SET_PRODUCTS,
  payload: data,
});

export const deleteProduct = (data) => ({
  type: C.DELETE_PRODUCTS,
  payload: data,
});
