import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CacheService } from '@src/redis/cache.service';
import { UsersService } from '@src/users/users.service';

import { createJwt, decodeJwt } from '@src/auth/utilities/methods';

import { LoginDto, SignUpDto } from '@src/auth/dto';

import {
  ISignUpResponse,
  ILoginResponse,
  IJwtDataWithStatus,
  ICreateJwtResponse,
  ITokenRefreshResponse,
} from './interfaces';

import { AuthTokenType, TokenNames } from '@src/auth/enums';

import {
  DUPLICATE_USER,
  INVALID_EMAIL,
  INVALID_PASSWORD,
  FORBIDDEN,
} from '@src/auth/utilities/messages';

import {
  getHashedPassword,
  comparePassword,
  getSplitedAuthorizationHeader,
} from '@src/auth/utilities/methods';

import { IGetUserResponse } from '@src/users/interfaces';

@Injectable()
export class AuthService {
  private readonly accessTokenDurationInSeconds = 60 * 10;
  private readonly refreshTokenDurationInSeconds = 60 * 60 * 24 * 10;
  private readonly jwtSecretKey =
    this.configService.get<string>('JWT_SECRET_KEY');
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly cacheService: CacheService,
  ) {}
  async signUp(signUpDto: SignUpDto): Promise<ISignUpResponse> {
    const { email } = signUpDto || {};
    const currentUsers = await this.usersService.findUserByEmail(email);

    if (currentUsers?.id) {
      throw new BadRequestException(DUPLICATE_USER);
    }

    const hashedPassord = await getHashedPassword(signUpDto.password);
    const newUser = await this.usersService.createUser({
      ...signUpDto,
      password: hashedPassord,
    });
    const { jwtToken: accessToken, expiresIn } = this.getAccessToken(
      newUser.id,
    );
    const { jwtToken: refreshToken } = this.getRefreshToken(newUser.id);

    return {
      accessToken,
      refreshToken,
      expiresIn,
      tokenType: AuthTokenType.Bearer,
    };
  }

  async login(loginDto: LoginDto): Promise<ILoginResponse> {
    const { email, password } = loginDto || {};

    const currentUser = await this.usersService.findUserByEmail(email);

    if (!currentUser?.id) {
      throw new BadRequestException(INVALID_EMAIL);
    }

    if (!(await comparePassword(password, currentUser.password))) {
      throw new BadRequestException(INVALID_PASSWORD);
    }

    const { jwtToken: accessToken, expiresIn } = this.getAccessToken(
      currentUser.id,
    );
    const { jwtToken: refreshToken } = this.getRefreshToken(currentUser.id);

    return {
      accessToken,
      refreshToken,
      expiresIn,
      tokenType: AuthTokenType.Bearer,
    };
  }

  async logout(authorization: string, refreshToken: string): Promise<void> {
    const { token: accessToken = '' } =
      getSplitedAuthorizationHeader(authorization);

    this.blacklistJwtToken(accessToken);
    this.blacklistJwtToken(refreshToken);
  }

  async tokenRefresh(refreshToken: string): Promise<ITokenRefreshResponse> {
    const tokenDecodedData: IJwtDataWithStatus = decodeJwt(
      refreshToken,
      this.jwtSecretKey,
    );

    const { payload: { tokenName = '', sub = '' } = {} } =
      tokenDecodedData || {};
    if (tokenDecodedData.isValid && tokenName === TokenNames.REFRESH) {
      const { jwtToken, expiresIn } = this.getAccessToken(sub) || {};
      return {
        accessToken: jwtToken,
        expiresIn,
        tokenType: AuthTokenType.Bearer,
      };
    } else {
      throw new ForbiddenException(FORBIDDEN);
    }
  }

  async validateAutorization(
    authorization: string,
  ): Promise<IGetUserResponse | false> {
    if (!authorization) {
      return false;
    }
    const { type, token } = getSplitedAuthorizationHeader(authorization);

    if (type !== AuthTokenType.Bearer) {
      return false;
    }

    const jwtObject = decodeJwt(token, this.jwtSecretKey);

    if (
      !jwtObject.isValid ||
      (jwtObject.payload && jwtObject.payload.tokenName !== TokenNames.ACCESS)
    ) {
      return false;
    }

    if (await this.cacheService.get(token)) {
      return false;
    }

    const { payload: { sub = '' } = {} } = jwtObject;
    const currentUser = await this.usersService.getUser(sub);
    if (!currentUser) {
      return false;
    }

    return currentUser;
  }

  async blacklistJwtToken(token: string) {
    const tokenDecodedData: IJwtDataWithStatus = decodeJwt(
      token,
      this.jwtSecretKey,
    );

    if (!(await this.cacheService.get(token)) && tokenDecodedData.isValid) {
      const { exp } = tokenDecodedData.payload;

      const ttl = Math.round((exp - Date.now()) / 1000);

      this.cacheService.set(token, true, ttl);
    }
  }

  getAccessToken(sub: string): ICreateJwtResponse {
    return createJwt(
      sub,
      Date.now() + this.accessTokenDurationInSeconds * 1000,
      this.jwtSecretKey,
      this.accessTokenDurationInSeconds,
      TokenNames.ACCESS,
    );
  }
  getRefreshToken(sub: string): ICreateJwtResponse {
    return createJwt(
      sub,
      Date.now() + this.refreshTokenDurationInSeconds * 1000,
      this.jwtSecretKey,
      this.refreshTokenDurationInSeconds,
      TokenNames.REFRESH,
    );
  }
}
