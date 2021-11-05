import { Controller, Get, Post, Body, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LoginDto, SignUpDto } from './dto';

import { SignUpResponse } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<SignUpResponse> {
    return this.authService.signUp();
  }

  @Post('/login')
  login(): string {
    return this.authService.signUp();
  }

  @Post('/token/refresh')
  refreshToken(): string {
    return this.authService.signUp();
  }

  @Get('/token/revoke')
  tokenRevoke(): string {
    return this.authService.signUp();
  }
}
