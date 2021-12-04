import { IPaginationResponse } from '@src/interfaces';
import { IProductResponse } from './product-response.interface';

export interface IGetAllProductsResponse extends IPaginationResponse {
  products: IProductResponse[];
}
