export interface IProductPrice {
  amount: number;
  currency: string;
}

export interface IBaseProduct {
  name: string;
  imageUrl: string;
  price: IProductPrice;
  availableQuantity: number;
  lateUpdatedAt: Date;
  createdAt: Date;
}
