import { useSelector } from "react-redux";

import Images from "next/image";

import LoaderErrorComponent from "@src/components/common/loader-error-component/loader-error-component";

import { IRootReducerState } from "@action-reducers/root.reducer";
import { IOrderListProps } from "./order-list.interface";

import styles from "./order-list.module.scss";

function OrderList({ className }: IOrderListProps) {
  const isLoading = useSelector(
    (state: IRootReducerState) => state.order.getOrders.isLoading,
  );
  const errors = useSelector(
    (state: IRootReducerState) => state.order.getOrders.errors,
  );
  const list = useSelector(
    (state: IRootReducerState) => state.order.getOrders.list,
  );

  return (
    <div className={className}>
      <div className={styles.cntntWrap}>
        <LoaderErrorComponent
          isLoading={isLoading}
          errors={errors}
          className={styles.lodrNErrCmpt}
        />
        {(!list || list.length === 0) && (
          <p className={`typo_body_1 ${styles.noOrder}`}>No order found</p>
        )}
        {list?.length > 0 && (
          <ul className={styles.orderLst}>
            {list.map((item) => {
              const { id, createdAt, address, paid, products } = item || {};
              return (
                <li key={id} className={`typo_body_1 ${styles.orderItm}`}>
                  <div
                    className={`${styles.itemRow} ${styles["itemRow--top"]}`}
                  >
                    <div>
                      <span className="typo_body_4">Order Id:</span>
                      <span>{id}</span>
                    </div>
                    <div>
                      <span className="typo_body_4">Created At:</span>{" "}
                      <span>{new Date(createdAt).toDateString()}</span>
                    </div>
                    {paid?.amount && (
                      <div>
                        <span className="typo_body_4">Total Paid:</span>{" "}
                        <span>
                          {paid.amount} {paid.currency}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className={styles.itemRow}>
                    <span className="typo_body_4">Address:</span>{" "}
                    <span>{address}</span>
                  </div>
                  {products?.length > 0 && (
                    <div className={styles.itemRow}>
                      <h4 className={`typo_body_4 ${styles.productHdng}`}>
                        Products:
                      </h4>
                      <ul className={styles.productLst}>
                        {products.map((productItem) => {
                          const {
                            id: productId,
                            name,
                            imageUrl,
                            purchasedQuantity,
                            price,
                            seller,
                          } = productItem || {};
                          return (
                            <li key={productId} className={styles.productItem}>
                              <div className={styles.productImgWrap}>
                                <Images
                                  src={imageUrl}
                                  alt={name}
                                  layout="fill"
                                  loader={() => imageUrl}
                                  unoptimized
                                  priority
                                />
                              </div>
                              <div>
                                <div>
                                  <span className="typo_body_4">Name:</span>{" "}
                                  <span>{name}</span>
                                </div>
                                <div>
                                  <span className="typo_body_4">
                                    Purchased Quantity:
                                  </span>{" "}
                                  <span>{purchasedQuantity}</span>
                                </div>
                                {price?.amount && (
                                  <div>
                                    <span className="typo_body_4">
                                      Purchased price:
                                    </span>{" "}
                                    <span>
                                      {price.amount} {price.currency}
                                    </span>
                                  </div>
                                )}

                                {seller?.name && (
                                  <div>
                                    <span className="typo_body_4">
                                      Sold by:
                                    </span>{" "}
                                    <span>{seller.name}</span>
                                  </div>
                                )}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default OrderList;
