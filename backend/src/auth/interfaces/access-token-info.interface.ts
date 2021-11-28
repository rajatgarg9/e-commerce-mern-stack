import { AuthTokenType } from '@src/auth/enums';

export interface AccessTokenInfo {
  accessToken: string;
  expiresIn: number;
  tokenType: AuthTokenType;
}
