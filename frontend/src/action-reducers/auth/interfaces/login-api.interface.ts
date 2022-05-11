import { IAuthReducerMainData } from "./auth-reducer-state.interface";

export type ILoginApiResponse = Omit<IAuthReducerMainData, "expiresAt">;

export interface ILoginApiBody {
  email: string;
  password: string;
}
