import { combineReducers } from "redux";

import userDetailsReducer from "./user-details/user-details.reducer";
import authReducer from "./auth/auth.reducer";
import productListReducer from "./product-list/product-list.reducer";

export const reducers = combineReducers({
  userDetails: userDetailsReducer,
  auth: authReducer,
  productList: productListReducer,
});

export type IRootReducerState = ReturnType<typeof reducers>;
