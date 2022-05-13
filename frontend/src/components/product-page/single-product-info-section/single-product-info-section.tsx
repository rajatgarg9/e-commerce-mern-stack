import React from "react";
import { useSelector } from "react-redux";
import Image from "next/image";

import LoaderErrorComponent from "@src/components/common/loader-error-component/loader-error-component";
import Button from "@src/components/common/button/button";

import { IRootReducerState } from "@src/action-reducers/root.reducer";

import { ISingleProductInfoSectionPropTypes } from "./single-product-info-section.interface";

import styles from "./single-product-info-section.module.scss";

function SingleProductInfoSection({
  className = "",
}: ISingleProductInfoSectionPropTypes) {
  const isLoading = useSelector(
    (state: IRootReducerState) => state.singleProduct.isLoading,
  );
  const errors = useSelector(
    (state: IRootReducerState) => state.singleProduct.errors,
  );
  const imageUrl = useSelector(
    (state: IRootReducerState) => state.singleProduct.imageUrl,
  );
  const name = useSelector(
    (state: IRootReducerState) => state.singleProduct.name,
  );
  const price = useSelector(
    (state: IRootReducerState) => state.singleProduct.price,
  );
  const availableQuantity = useSelector(
    (state: IRootReducerState) => state.singleProduct.availableQuantity,
  );
  const seller = useSelector(
    (state: IRootReducerState) => state.singleProduct.seller,
  );

  const { amount, currency } = price || {};

  const hasError = errors && errors.length > 0;
  return (
    <div className={`${className}`}>
      <div className={styles.contentWrap}>
        <LoaderErrorComponent
          isLoading={isLoading}
          errors={errors}
          className={styles.lodrNErrCmpt}
        />
        {!hasError && !isLoading && (
          <div className={styles.productCntnt}>
            {imageUrl && (
              <div className={styles.productImageWrap}>
                <Image
                  layout="fill"
                  loader={() => imageUrl}
                  src={imageUrl}
                  alt={name}
                />
              </div>
            )}
            <div className={styles.rightSec}>
              <h2 className={`${styles.name} typo_heading_1`}>{name}</h2>
              <p className={`${styles.priceInfo} typo_heading_5`}>
                Price: {amount} {currency}
              </p>
              {seller?.name && (
                <p className={`${styles.seller} typo_body_1`}>
                  Seller: {seller.name}
                </p>
              )}
              {availableQuantity < 1 && (
                <p className={`${styles.outStock} typo_body_1`}>Out of stock</p>
              )}
              <div className={styles.buttonWrap}>
                <Button
                  onClick={() => undefined}
                  isDisabled={availableQuantity < 1}
                >
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleProductInfoSection;
