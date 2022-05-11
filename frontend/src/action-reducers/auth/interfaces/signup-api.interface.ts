import { IAuthReducerMainData } from "./auth-reducer-state.interface";

export type ISignupApiResponse = Omit<IAuthReducerMainData, "expiresAt">;

export interface ISignupApiBody {
  name: string;
  email: string;
  password: string;
}
