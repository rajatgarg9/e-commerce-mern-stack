import { IBaseProduct } from './product.interface';

export interface IProductResponse extends IBaseProduct {
  id: string;
  seller: {
    name: string;
    id: string;
  };
}
