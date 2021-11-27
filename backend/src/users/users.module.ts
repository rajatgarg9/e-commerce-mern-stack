import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { USERS_COLLECTION } from '@src/mongo/users/users.collection';

@Module({
  imports: [MongooseModule.forFeature([USERS_COLLECTION])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
