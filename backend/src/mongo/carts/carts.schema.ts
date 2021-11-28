import { Schema } from 'mongoose';

import { ICartDoa } from './carts.doa';

import { PRODUCTS_COLLECTION } from '@src/mongo/products/products.collection';

export const CartSchema = new Schema<ICartDoa>({
  userId: { type: String, required: true, unique: true },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
  modifiedAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
  products: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: PRODUCTS_COLLECTION.name,
        required: true,
      },
      selectedQuantity: { type: Number, required: true },
      addedAt: {
        type: Date,
        required: true,
        default: new Date(),
      },
      required: true,
    },
  ],
});
