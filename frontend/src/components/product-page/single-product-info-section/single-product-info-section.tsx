import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";

import LoaderErrorComponent from "@src/components/common/loader-error-component/loader-error-component";
import Button from "@src/components/common/button/button";
import ErrorPopup from "@components/common/error-popup/error-popup";
import PopupLoader from "@components/common/popup-loader/popup-loader";
import SuccessPopup from "@components/common/success-popup/success-popup";

import {
  addProductToCart,
  cartClearUpdateError,
  cartResetData,
} from "@action-reducers/cart/cart.action";

import { IRootReducerState } from "@src/action-reducers/root.reducer";

import { ButtonTagTypes } from "@components/common/button/button.enum";
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
  const id = useSelector((state: IRootReducerState) => state.singleProduct.id);
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
  const cartId = useSelector((state: IRootReducerState) => state.cart.id);
  const isCartLoading = useSelector(
    (state: IRootReducerState) => state.cart.isLoading,
  );
  const cartErrors = useSelector(
    (state: IRootReducerState) => state.cart.errors,
  );
  const dispatch = useDispatch();

  const { amount, currency } = price || {};

  return (
    <>
      <div className={`${className}`}>
        <div className={styles.contentWrap}>
          <LoaderErrorComponent
            isLoading={isLoading}
            errors={errors}
            className={styles.lodrNErrCmpt}
          />
          {!(errors?.length > 0) && !isLoading && (
            <div className={styles.productCntnt}>
              {imageUrl && (
                <div className={styles.productImageWrap}>
                  <Image
                    layout="fill"
                    loader={() => imageUrl}
                    src={imageUrl}
                    alt={name}
                    unoptimized
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
                  <p className={`${styles.outStock} typo_body_1`}>
                    Out of stock
                  </p>
                )}
                <div className={styles.buttonWrap}>
                  <Button
                    onClick={() =>
                      dispatch(addProductToCart(id, { selectedQuantity: 1 }))
                    }
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
      {cartErrors?.length > 0 && (
        <ErrorPopup
          onPopupClose={() => dispatch(cartClearUpdateError())}
          message={cartErrors}
        />
      )}
      {isCartLoading && <PopupLoader />}
      {cartId && (
        <SuccessPopup
          message={`${name} is added to cart successfully!`}
          actionButton={{
            type: ButtonTagTypes.LINK,
            title: "Go to cart",
            href: "/cart",
            onClick: () => dispatch(cartResetData()),
          }}
        />
      )}
    </>
  );
}

export default SingleProductInfoSection;
