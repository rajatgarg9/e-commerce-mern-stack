import { Controller, Post, Body, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';

import { DisableAuthDecorator } from '@src/auth/decorators/disable-auth.decorators';

import { SignUpDto, LoginDto } from '@src/auth/dto';

import {
  SignUpResponse,
  LoginResponse,
  TokenRefreshResponse,
  AuthHeader,
} from '@src/auth/interfaces';

@Controller('auth')
@DisableAuthDecorator()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<SignUpResponse> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return this.authService.login(loginDto);
  }

  @Post('/logout')
  async logout(
    @Headers() headers: AuthHeader & { refreshToken: string },
  ): Promise<void> {
    const { authorization, refreshToken } = headers || {};
    return this.authService.logout(authorization, refreshToken);
  }

  @Post('/token/refresh')
  async tokenRefresh(
    @Headers() headers: { refreshToken: string },
  ): Promise<TokenRefreshResponse> {
    const { refreshToken = '' } = headers || {};
    return this.authService.tokenRefresh(refreshToken);
  }
}
