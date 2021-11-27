export interface IJwtData {
  isValid?: boolean;
  header: {
    alg: 'HS256';
    typ: 'JWT';
  };
  payload: {
    sub: string;
    iss: 'poc';
    iat: number;
    exp: number;
  };
}
export interface ICreateJwtResponse {
  jwtToken: string;
  expiresIn: number;
}
