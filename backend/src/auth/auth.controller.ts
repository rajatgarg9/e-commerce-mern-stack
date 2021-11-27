import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

import { SignUpDto, LoginDto, LogoutDto } from '@src/auth/dto';

import { SignUpResponse, LoginResponse } from '@src/auth/interfaces';

@Controller('auth')
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
  async logout(@Body() logoutDto: LogoutDto): Promise<void> {
    return this.authService.logout(logoutDto);
  }
}
