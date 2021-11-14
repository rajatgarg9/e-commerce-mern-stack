import { Document } from 'mongoose';

export interface IOrder extends Document {
  readonly id: string;
  readonly userId: string;
  readonly createdAt: Date;
  readonly products: [
    {
      id: string;
      name: string;
      imageUrl: string;
      price: {
        amount: number;
        currency: string;
      };
      purchasedQuantity: string;
      seller: {
        id: string;
        name: string;
      };
    },
  ];
}
