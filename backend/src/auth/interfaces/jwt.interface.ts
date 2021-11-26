export interface IJwtData {
  header: {
    alg: 'HS256';
    typ: 'JWT';
  };
  payload: {
    sub: string;
    iss: 'poc';
    iat: number;
    exp: number;
    tokenName: string;
  };
}

interface IJwtDataValid extends IJwtData {
  isValid: true;
  header: IJwtData['header'];
  payload: IJwtData['payload'];
}
interface IJwtDataInvalid {
  isValid: false;
  header?: IJwtData['header'];
  payload?: IJwtData['payload'];
}

export type IJwtDataWithStatus = IJwtDataValid | IJwtDataInvalid;

export interface ICreateJwtResponse {
  jwtToken: string;
  expiresIn: number;
}
