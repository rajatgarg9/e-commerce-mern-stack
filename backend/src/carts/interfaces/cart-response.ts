import { IProductResponse } from '@src/products/interfaces';

export interface ICartProductResponse
  extends Omit<IProductResponse, 'lateUpdatedAt' | 'createdAt'> {
  addedAt: Date;
  selectedQuantity: number;
}

export interface ICartResponse {
  id: string;
  modifiedAt: Date;
  products: ICartProductResponse[];
}
