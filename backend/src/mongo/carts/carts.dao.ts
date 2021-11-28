import { Document } from 'mongoose';
import { ObjectID } from 'mongodb';

export interface ICartDao extends Document {
  readonly id: string;
  readonly userId: string;
  readonly modifiedAt: Date;
  readonly createdAt: Date;
  readonly products: [
    {
      id: typeof ObjectID;
      selectedQuantity: number;
      addedAt: number;
    },
  ];
}
