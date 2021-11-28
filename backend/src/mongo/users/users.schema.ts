import { Schema } from 'mongoose';

import { IUserDao } from './users.dao';

export const UserSchema = new Schema<IUserDao>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
});
