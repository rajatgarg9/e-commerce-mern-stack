import { HmacSHA256, enc } from 'crypto-js';
import {
  genSalt as bycrptjsGenSalt,
  hash as bycrptjsHash,
  compare as bycrptjsCompare,
} from 'bcryptjs';

export function getStringifyData(value: unknown): string {
  if (typeof value !== 'string') {
    return JSON.stringify(value);
  }

  return value;
}

export function encodeBase64(data: unknown) {
  return enc.Base64.stringify(enc.Utf8.parse(getStringifyData(data)));
}

export function decodeBase64(str: string) {
  return enc.Utf8.stringify(enc.Base64.parse(str));
}

export function encryptHmacSHA256(str: string, secretKey: string) {
  return encodeBase64(HmacSHA256(str, secretKey));
}

export function getHashedPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    bycrptjsGenSalt(10, function (saltError, salt) {
      if (saltError) {
        reject(saltError);
      }

      return bycrptjsHash(password, salt, function (hashError, hash) {
        if (hashError) {
          reject(hashError);
        }
        resolve(hash);
      });
    });
  });
}

export function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bycrptjsCompare(password, hash, function (error, result) {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
}
