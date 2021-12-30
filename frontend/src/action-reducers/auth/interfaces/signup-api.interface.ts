import { IAuthReducerMainData } from "./auth-reducer-state.interface";

export type ISignupApiResponse = IAuthReducerMainData;

export interface ISignupApiBody {
  name: string;
  email: string;
  password: string;
}
