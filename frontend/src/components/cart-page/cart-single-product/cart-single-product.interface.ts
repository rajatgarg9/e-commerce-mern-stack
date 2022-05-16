import { ICartProductApiResponse } from "@action-reducers/cart/interfaces/cart-api-response.interface";

export interface ICartSingleProduct extends ICartProductApiResponse {
  className?: string;
}
