import { AuthTokenType } from '@src/auth/enums';

export interface SignUpResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: AuthTokenType;
}
