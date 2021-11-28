import { Controller, Get, Req } from '@nestjs/common';

import { UsersService } from './users.service';

import { IGetUserResponse } from '@src/users/interfaces';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/@me')
  async getUser(@Req() req: any): Promise<IGetUserResponse> {
    const { user }: { user: IGetUserResponse } = req;

    return user;
  }
}
