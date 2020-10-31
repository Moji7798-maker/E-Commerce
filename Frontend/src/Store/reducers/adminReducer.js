import { C } from "../constant";

const initialState = [];

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case C.SET_CATEGORIES:
      return action.payload;

    case C.DELETE_CATEGORY:
      return state.filter((category, i) => category._id !== action.payload);

    case C.UPDATE_CATEGORY:
      return state.map((category, i) => {
        if (category._id === action.payload._id) {
          return {
            ...category,
            name: action.payload.name,
          };
        } else {
          return category;
        }
      });

    case C.ADD_CATEGORY:
      return [...state, action.payload];
    default:
      return state;
  }
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case C.UPDATE_PRODUCTS:
      return state.map((p, i) => {
        return p._id === action.payload._id ? action.payload : p;
      });

    case C.SET_PRODUCTS:
      return action.payload;

    case C.DELETE_PRODUCTS:
      return state.filter((p, i) => p._id !== action.payload);
    default:
      return state;
  }
};
