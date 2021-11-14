import { Schema } from 'mongoose';

import { IOrder } from './orders.interface';

export const OrderSchema = new Schema<IOrder>({
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
