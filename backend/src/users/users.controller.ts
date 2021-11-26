import { Controller, Get, Body, Post, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';

import { AuthGuard } from '@src/auth/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/@me')
  @UseGuards(AuthGuard)
  async getUser(@Body() data: any): Promise<any> {
    console.log('+++++++++++++++++++++');
    return 'Hello World';
    return this.usersService.getUser(data.userId);
  }

  @Post('/@me')
  async createUser(@Body() data: any): Promise<any> {
    return this.usersService.createUser(data);
  }
}
