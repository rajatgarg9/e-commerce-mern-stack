import { IAuthReducerMainData } from "./auth-reducer-state.interface";

export type ITokenRefreshApiResponse = Omit<
  IAuthReducerMainData,
  "refrehToken"
>;
