export interface ISingleOrderProductApiResponse {
  id: string;
  name: string;
  imageUrl: string;
  purchasedQuantity: number;
  price: {
    amount: number;
    currency: string;
  };
  seller: {
    id: string;
    name: string;
  };
}

export interface ISingleOrderApiResponse {
  id: string;
  createdAt: string;
  address: string;
  paid: {
    amount: number;
    currency: string;
  };
  products: ISingleOrderProductApiResponse[];
}
