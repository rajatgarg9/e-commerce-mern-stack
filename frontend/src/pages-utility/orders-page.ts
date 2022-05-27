import { fetchOrderList } from "@action-reducers/order/get-orders/get-orders.action";
import { IDispatch } from "@interfaces/store.interface";

export async function loadData(dispatch: IDispatch) {
  await dispatch(fetchOrderList());
}
