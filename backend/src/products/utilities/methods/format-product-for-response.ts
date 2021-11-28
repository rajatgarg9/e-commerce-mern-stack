import { IProductResponse } from '@src/products/interfaces';

export function getFormattedProductForResponse(product): IProductResponse {
  if (!product) {
    return null;
  }

  const seller = {
    id: product?.sellerId?.id,
    name: product?.sellerId?.name,
  };

  const formatttedProduct = product.toJSON();

  delete formatttedProduct.sellerId;

  formatttedProduct.seller = seller;

  return formatttedProduct as IProductResponse;
}
