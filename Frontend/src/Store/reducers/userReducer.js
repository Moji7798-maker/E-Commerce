import { C } from "../constant";

const initialState = {
  userInfo: {},
  loading: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case C.SET_USER_DATA:
      return {
        ...state,
        userInfo: action.payload,
      };

    case C.SIGN_USER_OUT:
      return {
        ...state,
        userInfo: {},
      };
    default:
      return state;
  }
};

export const productsReducer = (
  state = {
    bestSellers: [],
    newArrivals: [],
    shopProducts: [],
    shopDetails: {
      filters: { category: [], newPrice: [] },
      skip: 0,
      limit: 5,
      size: 0,
    },
  },
  action
) => {
  switch (action.type) {
    case C.SET_BEST_SELLERS:
      return { ...state, bestSellers: action.payload };
    case C.SET_NEW_ARRIVALS:
      return { ...state, newArrivals: action.payload };
    case C.SET_SHOP_PRODUCTS:
      return { ...state, shopProducts: action.payload };

    case C.SET_SHOP_FILTERS:
      return { ...state, shopDetails: action.payload };
    default:
      return state;
  }
};

export const cartReducer = (state = [], action) => {
  switch (action.type) {
    case C.SET_CART_ITEM:
      return Array.from(new Set([...state, { ...action.payload }]));

    case C.UPDATE_CART_ITEM:
      return state.map((p, i) => {
        if (p._id === action.payload._id) {
          p.count = action.payload.count;
          return p;
        } else return p;
      });

    case C.DELETE_CART_ITEM:
      return state.filter((p, i) => p._id !== action.payload._id);

    default:
      return state;
  }
};
