import { AuthTokenType } from '@src/auth/enums';

export interface IAccessTokenInfo {
  accessToken: string;
  expiresIn: number;
  tokenType: AuthTokenType;
}
