import { Document } from 'mongoose';

export interface IUserDoa extends Document {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly createdAt: Date;
}
