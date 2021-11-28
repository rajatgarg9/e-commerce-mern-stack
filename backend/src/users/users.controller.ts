import { Controller, Get, Req } from '@nestjs/common';

import { UsersService } from './users.service';

import { IGetUserResponse } from '@src/users/interfaces';

import { IRequest } from '@src/interfaces';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/@me')
  async getUser(@Req() req: IRequest): Promise<IGetUserResponse> {
    const { user } = req;

    return user;
  }
}
