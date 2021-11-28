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

UserSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
  },
});
