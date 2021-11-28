import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';

import { USERS_COLLECTION } from '@src/mongo/users/users.collection';
import { IUserDao } from '@src/mongo/users/users.dao';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(USERS_COLLECTION.name) private userModel: Model<IUserDao>,
  ) {}

  async getUser(id: string): Promise<any> {
    return this.userModel.findById(id);
  }

  async getUserByEmail(email: string): Promise<any> {
    return this.userModel.find({ email });
  }
  async createUser(data: any): Promise<any> {
    // this.logger.log(data);
    return this.userModel.create(data);
  }
}
