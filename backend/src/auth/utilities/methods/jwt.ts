import { IJwtDataWithStatus, ICreateJwtResponse } from '@src/auth/interfaces';

import { encryptHmacSHA256, encodeBase64, decodeBase64 } from './crypto';

export function createJwt(
  sub: string,
  exp: number,
  secretKey: string,
  expiresIn,
  tokenName: string,
): ICreateJwtResponse {
  const header: IJwtDataWithStatus['header'] = {
    alg: 'HS256',
    typ: 'JWT',
  };
  const payload: IJwtDataWithStatus['payload'] = {
    sub,
    exp,
    iat: Date.now(),
    iss: 'poc',
    tokenName,
  };
  const base64Header = encodeBase64(header);
  const base64Payload = encodeBase64(payload);

  const signature = encryptHmacSHA256(
    `${base64Header}.${base64Payload}`,
    secretKey,
  );
  const jwtToken = `${base64Header}.${base64Payload}.${signature}`;

  return { jwtToken, expiresIn };
}

export function decodeJwt(jwt: string, secretKey: string): IJwtDataWithStatus {
  try {
    const [base64Header = '', base64Payload = '', signature] = jwt.split('.');

    const newSignature = encryptHmacSHA256(
      `${base64Header}.${base64Payload}`,
      secretKey,
    );

    const header: IJwtDataWithStatus['header'] = JSON.parse(
      decodeBase64(base64Header),
    );

    const payload: IJwtDataWithStatus['payload'] = JSON.parse(
      decodeBase64(base64Payload),
    );

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
  } catch (error) {
    return {
      isValid: false,
    };
  }
}
