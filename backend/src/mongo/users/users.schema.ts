import { Schema } from 'mongoose';

import { IUserDoa } from './users.doa';

export const UserSchema = new Schema<IUserDoa>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
});
