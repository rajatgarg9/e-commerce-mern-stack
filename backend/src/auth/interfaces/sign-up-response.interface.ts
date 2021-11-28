import { AccessTokenInfo } from './access-token-info.interface';

export interface SignUpResponse extends AccessTokenInfo {
  refreshToken: string;
}
