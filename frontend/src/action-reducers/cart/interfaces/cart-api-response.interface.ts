export interface ICartProductApiResponse {
  id: string;
  name: string;
  seller: {
    id: string;
    name: string;
  };
  imageUrl: string;
  addedAt: string;
  selectedQuantity: number;
  availableQuantity: number;
  price: {
    amount: number;
    currency: string;
  };
}
export interface ICartApiResponse {
  id: string;
  lastUpdatedAt: string;
  products: ICartProductApiResponse[];
}
