import { Dispatch } from "redux";
import { AxiosInstance } from "axios";

import { IRootReducerState } from "@action-reducers/root.reducer";

export interface IThunkFunction {
  (
    dispatch: Dispatch,
    getState: () => IRootReducerState,
    api: AxiosInstance,
  ): Promise<void>;
}
