import { Schema } from 'mongoose';

import { IProductDao } from './products.dao';
import { USERS_COLLECTION } from '@src/mongo/users/users.collection';

export const ProuctSchema = new Schema<IProductDao>({
  name: { type: String, required: true },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: USERS_COLLECTION.name,
    required: true,
  },
  imageUrl: { type: String, required: true },
  availableQuantity: { type: Number, required: true },
  price: {
    type: new Schema<IProductDao['price']>({
      amount: { type: Number, required: true },
      currency: { type: String, required: true },
    }),
    required: true,
  },
  lateUpdatedAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
});
