import Image from "next/image";

import { ICartSingleProduct } from "./cart-single-product.interface";

import styles from "./cart-single-product.module.scss";

function CartSingleProduct({
  className = "",
  name,
  seller,
  imageUrl,
  selectedQuantity,
  availableQuantity,
  price,
}: ICartSingleProduct) {
  const { amount, currency } = price || {};
  return (
    <div className={`${styles.cartSnglpodct} ${className}`}>
      <div className={styles.imageWrap}>
        <Image
          src={imageUrl}
          alt="image"
          loader={() => imageUrl}
          layout="fill"
        />
      </div>
      <div className={`${styles.rightSec} typo_body_1`}>
        <h5 className={`${styles.name} typo_heading_5`}>{name}</h5>
        <div>Selected Quantity: {selectedQuantity}</div>
        {price && (
          <div>
            Price: {amount} {currency}
          </div>
        )}
        {availableQuantity === 0 && <div>Out of Stock</div>}
        {seller?.name && <div>Seller: {seller.name}</div>}
      </div>
    </div>
  );
}

export default CartSingleProduct;
