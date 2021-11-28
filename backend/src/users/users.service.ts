import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';

import { USERS_COLLECTION } from '@src/mongo/users/users.collection';

import { IUserDao } from '@src/mongo/users/users.dao';

import { IGetUserResponse, CreateUser } from '@src/users/interfaces';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(USERS_COLLECTION.name) private userModel: Model<IUserDao>,
  ) {}

  async getUser(id: string): Promise<IGetUserResponse> {
    return this.findUserById(id);
  }

  async findUserById(id: string): Promise<IUserDao> {
    return this.userModel.findById(id);
  }

  async findUserByEmail(email: string): Promise<IUserDao> {
    return this.userModel.findOne({ email });
  }
  async createUser(data: CreateUser): Promise<IGetUserResponse> {
    this.logger.verbose(`${data.email} user is successfully created`);
    return this.userModel.create(data);
  }
}
