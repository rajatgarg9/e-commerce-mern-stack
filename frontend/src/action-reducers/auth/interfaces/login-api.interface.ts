import { IAuthReducerMainData } from "./auth-reducer-state.interface";

export type ILoginApiResponse = IAuthReducerMainData;

export interface ILoginApiBody {
  email: string;
  password: string;
}
