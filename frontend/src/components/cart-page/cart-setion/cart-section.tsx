import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import Button from "@components/common/button/button";
import PopupLoader from "@components/common/popup-loader/popup-loader";
import ErrorPopup from "@components/common/error-popup/error-popup";
import SuccessPopup from "@components/common/success-popup/success-popup";
import LoaderErrorComponent from "@components/common/loader-error-component/loader-error-component";
import CartSingleProduct from "@components/cart-page/cart-single-product/cart-single-product";
import PreOrderDetailFormPopup from "@components/cart-page/pre-order-detail-form-popup/pre-order-detail-form-popup";

import {
  createOrder,
  createOrderResetData,
} from "@action-reducers/order/create-order/create-order.action";

import {
  cartResetData,
  emptyCart,
  cartClearUpdateError,
} from "@action-reducers/cart/cart.action";

import { IRootReducerState } from "@action-reducers/root.reducer";
import { ButtonTagTypes } from "@components/common/button/button.enum";
import { ICartSectionProps } from "./cart-section.interface";

import styles from "./cart-section.module.scss";

function CartSection({ className = "" }: ICartSectionProps) {
  const [isPreorderFormOpened, setIsPreorderFormOpened] = useState(false);
  const isLoading = useSelector(
    (state: IRootReducerState) => state.cart.isLoading,
  );
  const errors = useSelector((state: IRootReducerState) => state.cart.errors);
  const products = useSelector(
    (state: IRootReducerState) => state.cart.products,
  );
  const isCartUpdateInProgress = useSelector(
    (state: IRootReducerState) => state.cart.isUpdateInProgress,
  );
  const cartUpdateErrors = useSelector(
    (state: IRootReducerState) => state.cart.updateErrors,
  );
  const isCreateOrderLoading = useSelector(
    (state: IRootReducerState) => state.order.createOrder.isLoading,
  );
  const createOrderErrors = useSelector(
    (state: IRootReducerState) => state.order.createOrder.errors,
  );
  const orderId = useSelector(
    (state: IRootReducerState) => state.order.createOrder.id,
  );
  const dispatch = useDispatch();

  const [totalAmount, totalCurrency] = useMemo(() => {
    let localTotalAmount = 0;
    let localTotalCurrency = "";
    for (let i = 0; i < products?.length; ++i) {
      const { price: { amount = 0, currency = "" } = {} } = products[i] || {};
      localTotalCurrency = currency;
      localTotalAmount += amount;
    }
    return [localTotalAmount, localTotalCurrency];
  }, [products]);

  return (
    <>
      <div className={`${className}`}>
        <div className={styles.content}>
          <h1 className={`${styles.heading} typo_heading_1`}>Cart</h1>
          <LoaderErrorComponent
            isLoading={isLoading}
            errors={errors}
            className={styles.lodNErrCmpt}
          />
          {!isLoading && !(errors?.length > 0) && (
            <>
              {products?.length > 0 && (
                <ul className={styles.list}>
                  {products.map((item) => (
                    <li key={item?.id} className={styles.item}>
                      <CartSingleProduct {...item} />
                    </li>
                  ))}
                </ul>
              )}

              {products?.length === 0 && (
                <p className={`${styles.noRslt} typo_body_1`}>
                  No product found
                </p>
              )}
              {products?.length > 0 && (
                <>
                  <div className={`${styles.totalWrap} typo_heading_2`}>
                    <span>Total:</span>
                    <span>
                      {totalAmount} {totalCurrency}
                    </span>
                  </div>
                  <div className={styles.btnWrap}>
                    <Button
                      title="Place order"
                      onClick={() => setIsPreorderFormOpened(true)}
                      className={styles.btnItem}
                    />
                    <Button
                      title="Empty cart"
                      onClick={() => dispatch(emptyCart())}
                      className={styles.btnItem}
                    />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      {(isCreateOrderLoading || isCartUpdateInProgress) && <PopupLoader />}
      {createOrderErrors?.length > 0 && (
        <ErrorPopup
          message={createOrderErrors}
          onPopupClose={() => dispatch(createOrderResetData())}
        />
      )}
      {cartUpdateErrors?.length > 0 && (
        <ErrorPopup
          message={cartUpdateErrors}
          onPopupClose={() => dispatch(cartClearUpdateError())}
        />
      )}

      {orderId && (
        <SuccessPopup
          message={`Order with id ${orderId} has been placed successfully`}
          actionButton={{
            type: ButtonTagTypes.LINK,
            title: "Check all orders",
            href: "/orders",
            onClick: () => dispatch(createOrderResetData()),
          }}
        />
      )}
      {isPreorderFormOpened && (
        <PreOrderDetailFormPopup
          onPopupClose={() => setIsPreorderFormOpened(false)}
          onSubmit={(data) => {
            dispatch(
              createOrder(
                {
                  ...data,
                },
                {
                  onSuccessCallback: () => {
                    setIsPreorderFormOpened(false);
                    dispatch(cartResetData());
                  },
                  onFailCallback: () => setIsPreorderFormOpened(false),
                },
              ),
            );
          }}
        />
      )}
    </>
  );
}

export default CartSection;
