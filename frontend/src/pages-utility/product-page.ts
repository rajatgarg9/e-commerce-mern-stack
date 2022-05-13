import { fetchSingleProduct } from "@action-reducers/single-product/single-product.action";
import { IDispatch } from "@interfaces/store.interface";

export async function loadData(dispatch: IDispatch, id: string) {
  await dispatch(fetchSingleProduct(id));
}
