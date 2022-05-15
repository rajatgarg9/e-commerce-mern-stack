import { combineReducers } from "redux";

import getOrdersReducer from "./get-orders/get-orders.reducer";

const orderReducers = combineReducers({
  getOrders: getOrdersReducer,
});

export default orderReducers;
