import { fetchProductList } from "@action-reducers/product-list/product-list.action";

import { IDispatch } from "@interfaces/store.interface";

export async function loadData(dispatch: IDispatch) {
  await dispatch(fetchProductList());
}
