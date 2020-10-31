import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  userReducer,
  productsReducer,
  cartReducer,
} from "./reducers/userReducer";
import { categoryReducer, productReducer } from "./reducers/adminReducer";
import jwt_decode from "jwt-decode";

const userInfo = localStorage.getItem("ecom-jwt")
  ? jwt_decode(localStorage.getItem("ecom-jwt"))
  : null;

const initialState = {
  user: { userInfo },
  cart: JSON.parse(localStorage.getItem("ecommerce-cart")) || [],
};

const reducer = combineReducers({
  user: userReducer,
  categories: categoryReducer,
  adminProducts: productReducer,
  userProducts: productsReducer,
  cart: cartReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
