import { Schema, Document } from 'mongoose';

export interface Test extends Document {
  avatar: string;
  name: string;
  age: number;
}

export const UserSchema = new Schema<Test>({
  name: { type: String, required: false },
  age: Number,
});

export type UserDocument = typeof UserSchema & Document;
