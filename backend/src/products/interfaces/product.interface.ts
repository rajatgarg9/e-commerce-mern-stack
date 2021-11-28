export interface IBaseProduct {
  name: string;
  imageUrl: string;
  price: {
    amount: number;
    currency: string;
  };
  availableQuantity: number;
  lateUpdatedAt: Date;
  createdAt: Date;
}
