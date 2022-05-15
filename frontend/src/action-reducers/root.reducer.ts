import { combineReducers } from "redux";

import userDetailsReducer from "./user-details/user-details.reducer";
import authReducer from "./auth/auth.reducer";
import productListReducer from "./product-list/product-list.reducer";
import singleProductReducer from "./single-product/single-product.reducer";
import cartReducer from "./cart/cart.reducer";
import orderReducers from "./order/order.reducer";

export const reducers = combineReducers({
  userDetails: userDetailsReducer,
  auth: authReducer,
  productList: productListReducer,
  singleProduct: singleProductReducer,
  cart: cartReducer,
  order: orderReducers,
});

export type IRootReducerState = ReturnType<typeof reducers>;
