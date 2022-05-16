import { ICreateOrderFormParam } from "@action-reducers/order/create-order/interfaces/create-order-thunk.interface";

export interface IPreOrderDetailFormPopup {
  onPopupClose: () => void;
  onSubmit: (data: ICreateOrderFormParam) => void;
}
