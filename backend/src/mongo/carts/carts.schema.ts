import { Schema } from 'mongoose';

import { ICartDao } from './carts.dao';

import { PRODUCTS_COLLECTION } from '@src/mongo/products/products.collection';

export const CartSchema = new Schema<ICartDao>({
  userId: { type: String, required: true, unique: true },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
  lastUpdatedAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
  products: [
    {
      _id: false,
      id: {
        type: Schema.Types.ObjectId,
        ref: PRODUCTS_COLLECTION.name,
        required: true,
      },
      selectedQuantity: { type: Number, required: true, min: 0 },
      addedAt: {
        type: Date,
        required: true,
        default: new Date(),
      },
    },
  ],
});

CartSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});
