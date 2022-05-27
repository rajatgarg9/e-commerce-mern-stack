import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NextPage } from "next";

import Header from "@components/common/header/header";
import OrderList from "@components/orders-page/order-list/order-list";

import userDetails from "@src/hoc/userDetails";

import { getOrdersResetData } from "@action-reducers/order/get-orders/get-orders.action";

import { loadData } from "@src/pages-utility/orders-page";

import { IRootReducerState } from "@action-reducers/root.reducer";
import { INextPageContext } from "@interfaces/get-initial-props.interface";

import styles from "./orders.module.scss";

function Orders() {
  const isInitialLoadFetchedSuccessfully = useSelector(
    (state: IRootReducerState) =>
      state.order.getOrders.isInitialLoadFetchedSuccessfully,
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (!isInitialLoadFetchedSuccessfully) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      loadData(dispatch);
    }

    return () => {
      dispatch(getOrdersResetData());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="productPage">
      <Header />
      <OrderList className={styles.orderList} />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default userDetails(Orders as NextPage<any>);

Orders.getInitialProps = async (ctx: INextPageContext) => {
  await loadData(ctx.store.dispatch);
};
