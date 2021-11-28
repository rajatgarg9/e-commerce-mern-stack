import { Controller, Post, Body, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';

import { DisableAuthDecorator } from '@src/auth/decorators/disable-auth.decorator';

import { SignUpDto, LoginDto } from '@src/auth/dto';

import {
  ISignUpResponse,
  ILoginResponse,
  ITokenRefreshResponse,
  IAuthHeader,
} from '@src/auth/interfaces';

@Controller('auth')
@DisableAuthDecorator()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<ISignUpResponse> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<ILoginResponse> {
    return this.authService.login(loginDto);
  }

  @Post('/logout')
  async logout(
    @Headers() headers: IAuthHeader & { refresh_token: string },
  ): Promise<void> {
    const { authorization, refresh_token: refreshToken } = headers || {};
    return this.authService.logout(authorization, refreshToken);
  }

  @Post('/token/refresh')
  async tokenRefresh(
    @Headers() headers: { refresh_token: string },
  ): Promise<ITokenRefreshResponse> {
    const { refresh_token: refreshToken = '' } = headers || {};

    return this.authService.tokenRefresh(refreshToken);
  }
}
