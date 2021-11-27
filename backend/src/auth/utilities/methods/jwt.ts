import { IJwtData, ICreateJwtResponse } from '@src/auth/interfaces';

import { encryptHmacSHA256, encodeBase64, decodeBase64 } from './crypto';

export function createJwt(
  sub: string,
  exp: number,
  secretKey: string,
): ICreateJwtResponse {
  const header: IJwtData['header'] = {
    alg: 'HS256',
    typ: 'JWT',
  };
  const payload: IJwtData['payload'] = {
    sub,
    exp,
    iat: Date.now(),
    iss: 'poc',
  };
  const base64Header = encodeBase64(header);
  const base64Payload = encodeBase64(payload);

  const signature = encryptHmacSHA256(
    `${base64Header}.${base64Payload}`,
    secretKey,
  );
  const jwtToken = `${base64Header}.${base64Payload}.${signature}`;

  return { jwtToken, expiresIn: this.accessTokenDurationInSeconds };
}

export function decodeJwt(jwt: string, secretKey: string): IJwtData {
  const [base64Header = '', base64Payload = '', signature] = jwt.split('.');

  const newSignature = encryptHmacSHA256(
    `${base64Header}.${base64Payload}`,
    secretKey,
  );

  const header: IJwtData['header'] = JSON.parse(decodeBase64(base64Header));

  const payload: IJwtData['payload'] = JSON.parse(decodeBase64(base64Payload));

  const { exp } = payload || {};

  const result = {
    isValid: false,
    header,
    payload,
  };

  if (newSignature === signature && exp > Date.now()) {
    result.isValid = true;
  }

  return result;
}
