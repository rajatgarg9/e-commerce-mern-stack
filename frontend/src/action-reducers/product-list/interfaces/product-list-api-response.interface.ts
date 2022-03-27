import { IPagination } from "@interfaces/pagination.interface";
import { IProduct } from "@interfaces/product.interface";

export interface IProductListAPIResponse {
  productList: IProduct[];
  pagination: IPagination;
}
