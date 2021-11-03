import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LoginDto, SignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/sign-up')
  signUp(): string {
    return this.authService.getHello();
  }

  @Post('/login')
  login(): string {
    return this.authService.getHello();
  }

  @Post('/token/refresh')
  refreshToken(): string {
    return this.authService.getHello();
  }

  @Get('/token/revoke')
  tokenRevoke(): string {
    return this.authService.getHello();
  }
}
