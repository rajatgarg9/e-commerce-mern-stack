import { IBaseProduct, IProductPrice } from '@src/products/interfaces';

export interface IBaseOrderProduct
  extends Omit<
    IBaseProduct,
    'availableQuantity' | 'lateUpdatedAt' | 'createdAt'
  > {
  id: string;
  purchasedQuantity: number;
  seller: {
    id: string;
    name: string;
  };
}

export interface ISinglBaseOrder {
  id: string;
  createdAt: Date;
  address: string;
  paid: IProductPrice;
  products: IBaseOrderProduct[];
}
