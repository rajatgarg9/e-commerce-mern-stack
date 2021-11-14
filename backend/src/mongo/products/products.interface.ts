import { Document } from 'mongoose';
import { ObjectID } from 'mongodb';

export interface IProduct extends Document {
  readonly id: string;
  readonly sellerId: typeof ObjectID;
  readonly name: string;
  readonly imageUrl: string;
  readonly price: {
    amount: number;
    currency: string;
  };
  readonly availableQuantity: number;
  readonly lateUpdatedAt: Date;
  readonly createdAt: Date;
}
