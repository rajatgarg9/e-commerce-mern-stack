import { combineReducers } from "redux";

import getOrdersReducer from "./get-orders/get-orders.reducer";
import createOrderReducer from "./create-order/create-order.reducer";

const orderReducers = combineReducers({
  getOrders: getOrdersReducer,
  createOrder: createOrderReducer,
});

export default orderReducers;
