import { Document } from 'mongoose';
import { ObjectID } from 'mongodb';

export interface ICartDao extends Document {
  readonly id: string;
  readonly userId: string;
  lastUpdatedAt: Date;
  readonly createdAt: Date;
  products: [
    {
      id: typeof ObjectID;
      selectedQuantity: number;
      addedAt: number;
    },
  ];
}
