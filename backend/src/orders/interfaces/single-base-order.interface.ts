import { IBaseProduct } from '@src/products/interfaces';

export interface IBaseOrderProduct
  extends Omit<
    IBaseProduct,
    'availableQuantity' | 'lateUpdatedAt' | 'createdAt'
  > {
  id: string;
  purchasedQuantity: string;
  seller: {
    id: string;
    name: string;
  };
}

export interface ISinglBaseOrder {
  id: string;
  createdAt: Date;
  products: IBaseOrderProduct;
}
