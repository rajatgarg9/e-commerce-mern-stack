import React from "react";
import { useSelector } from "react-redux";

import LoaderErrorComponent from "@src/components/common/loader-error-component/loader-error-component";
import Image from "@src/components/common/image/image";

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
            <div className={styles.productImageWrap}>
              <Image
                src={imageUrl as string}
                alt={name as string}
                className={styles.productImage}
              />
            </div>
            <div className={styles.rightSec}>
              <h2 className={`${styles.name} typo_heading_1`}>{name}</h2>
              <p className={`${styles.priceInfo} typo_body_1`}>
                Price: {amount}
                {currency}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleProductInfoSection;
