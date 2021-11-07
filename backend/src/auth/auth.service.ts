import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { LoginDto, SignUpDto } from './dto';

import { UserDocument, Test } from './schema/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel('users') private userModel: Model<Test>) {}

  signUp(): any {
    const createdCat = new this.userModel();
    return createdCat.save();
    // this.userModel.
    return 'Hello World1!';
  }
}
