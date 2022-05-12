import { Store, AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AxiosInstance } from "axios";

import { IRootReducerState } from "@action-reducers/root.reducer";

export type IStore = Store<IRootReducerState> & {
  dispatch: ThunkDispatch<IRootReducerState, AxiosInstance, AnyAction>;
};
