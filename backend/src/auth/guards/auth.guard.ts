import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CacheService } from '@src/redis/cache.service';
import { UsersService } from '@src/users/users.service';

import { AuthTokenType, TokenNames } from '@src/auth/enums';

import { decodeJwt } from '@src/auth/utilities/methods';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly jwtSecretKey =
    this.configService.get<string>('JWT_SECRET_KEY');
  constructor(
    private readonly configService: ConfigService,
    private readonly cacheService: CacheService,
    private readonly usersService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    if (!authorization) {
      return false;
    }
    const [type, token] = authorization.split(' ');

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
    const currentUsers = await this.usersService.getUser(sub);
    if (!currentUsers) {
      return false;
    }

    request.user = currentUsers;

    return true;
  }
}
