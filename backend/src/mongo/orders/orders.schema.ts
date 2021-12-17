import { Schema } from 'mongoose';

import { IOrderDao } from './orders.dao';

export const OrderSchema = new Schema<IOrderDao>({
  userId: { type: String, required: true },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
  address: { type: String, required: true },
  paid: {
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true },
  },
  products: [
    {
      _id: false,
      id: { type: String, required: true },
      name: { type: String, required: true },
      seller: {
        id: { type: String, required: true },
        name: { type: String, required: true },
      },
      imageUrl: { type: String, required: true },
      purchasedQuantity: { type: Number, required: true, min: 0 },
      price: {
        amount: { type: Number, required: true, min: 0 },
        currency: { type: String, required: true },
      },
    },
  ],
});

OrderSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});
