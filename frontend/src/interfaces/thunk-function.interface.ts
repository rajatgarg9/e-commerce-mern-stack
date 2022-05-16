import { AnyAction } from "redux";
import { AxiosInstance } from "axios";
import { ThunkAction } from "redux-thunk";

import { IRootReducerState } from "@action-reducers/root.reducer";

export type IThunkFunction = ThunkAction<
  Promise<void>,
  IRootReducerState,
  AxiosInstance,
  AnyAction
>;

export interface IThunkCallbackParameter {
  onStartCallback?: () => void;
  onSuccessCallback?: () => void;
  onFailCallback?: () => void;
}
