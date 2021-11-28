import { IAccessTokenInfo } from './access-token-info.interface';

export interface ISignUpResponse extends IAccessTokenInfo {
  refreshToken: string;
}
