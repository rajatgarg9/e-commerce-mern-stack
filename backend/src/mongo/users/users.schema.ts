import { Schema } from 'mongoose';

import { IUser } from './users.interface';

export const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
});
