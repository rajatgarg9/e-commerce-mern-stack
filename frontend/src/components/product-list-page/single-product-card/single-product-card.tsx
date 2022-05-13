import React from "react";
import Image from "next/image";

import Button from "@components/common/button/button";

import { ButtonTagTypes } from "@components/common/button/button.enum";

import { ISingleProductCardPropTypes } from "./single-product-card.interface";

import styles from "./single-product-card.module.scss";

function SingleProductCard({
  className = "",
  imageUrl,
  name,
  price,
  id,
}: ISingleProductCardPropTypes) {
  const { amount, currency } = price || {};
  return (
    <div className={`${styles.snglPodctCrd} ${className}`}>
      <div className={styles.podctImgWrap}>
        <Image
          loader={() => imageUrl}
          src={imageUrl}
          alt={name}
          layout="fill"
        />
      </div>
      <div className={styles.bottomCntnt}>
        <h6 className={`${styles.productName} typo_heading_3`}>{name}</h6>
        <p className={`${styles.price} typo_body_3`}>
          Price: {amount} {currency}
        </p>
        <div className={styles.viewBtnWrap}>
          <Button
            title="View Details"
            type={ButtonTagTypes.LINK}
            href={`/product/${id}`}
          />
        </div>
      </div>
    </div>
  );
}

export default SingleProductCard;
