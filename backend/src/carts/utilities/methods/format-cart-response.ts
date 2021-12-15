import { ICartResponse, ICartProductResponse } from '@src/carts/interfaces';

import { ICartDao } from '@src/mongo/carts/carts.dao';

export function getFormattedCartResponse(cart: ICartDao): ICartResponse {
  const { id, modifiedAt, products = [] } = cart || {};

  const formattedProducts = products?.map((item): ICartProductResponse => {
    const { selectedQuantity, addedAt, id: product } = item;
    const {
      id,
      name,
      price,
      imageUrl,
      availableQuantity,
      sellerId: { id: sellerId = '', name: sellerName = '' } = {},
    } = product || {};

    return {
      id,
      price,
      name,
      selectedQuantity,
      addedAt,
      imageUrl,
      availableQuantity,
      seller: {
        id: sellerId,
        name: sellerName,
      },
    };
  });

  const formattedCart = {
    id,
    modifiedAt,
    products: formattedProducts,
  };

  return formattedCart;
}
