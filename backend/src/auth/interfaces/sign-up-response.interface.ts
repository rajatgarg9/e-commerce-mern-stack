import { AuthTokenType } from '../enums/auth-token-type.enum';

export interface SignUpResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: AuthTokenType;
}
