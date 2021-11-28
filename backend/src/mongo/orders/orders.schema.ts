import { Schema } from 'mongoose';

import { IOrderDao } from './orders.dao';

export const OrderSchema = new Schema<IOrderDao>({
  userId: { type: String, required: true },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
  products: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      seller: {
        id: { type: String, required: true },
        name: { type: String, required: true },
        required: true,
      },
      imageUrl: { type: String, required: true },
      purchasedQuantity: { type: Number, required: true },
      price: {
        amount: { type: Number, required: true },
        currency: { type: String, required: true },
      },
      required: true,
    },
  ],
});
