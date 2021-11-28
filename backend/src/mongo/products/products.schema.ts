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
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
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

ProuctSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});
