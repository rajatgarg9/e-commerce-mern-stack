import { IRootReducerState } from "@src/action-reducers/root.reducer";

export interface IServerSideFunctionDataFetchReturn {
  initialReduxState: IRootReducerState;
  hasServerFetchedData: true;
}

interface IServerSideFunctionNoDataFetchReturn {
  hasServerFetchedData: false;
}

export type IServerSideFunctionReturn =
  | IServerSideFunctionDataFetchReturn
  | IServerSideFunctionNoDataFetchReturn;
