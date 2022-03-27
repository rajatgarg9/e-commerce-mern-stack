export interface IProduct {
  id: string;
  seller: {
    id: string;
    name: string;
  };
  name: string;
  imageUrl: string;
  price: {
    amount: number;
    currency: string;
  };
  availableQuantity: number;
  createdAt: string;
  lastUpdatedAt: string;
}
