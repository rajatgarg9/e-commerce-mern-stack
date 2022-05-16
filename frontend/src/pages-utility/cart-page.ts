import { fetchCart } from "@action-reducers/cart/cart.action";
import { IDispatch } from "@interfaces/store.interface";

export async function loadData(dispatch: IDispatch) {
  await dispatch(fetchCart());
}
