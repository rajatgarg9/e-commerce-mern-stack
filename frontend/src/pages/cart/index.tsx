import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NextPage } from "next";

import Header from "@components/common/header/header";
import CartSection from "@components/cart-page/cart-setion/cart-section";

import userDetails from "@src/hoc/userDetails";

import { fetchCart, cartResetData } from "@action-reducers/cart/cart.action";

import { loadData } from "@src/pages-utility/cart-page";

import { IRootReducerState } from "@action-reducers/root.reducer";
import { INextPageContext } from "@interfaces/get-initial-props.interface";

import styles from "./cart.module.scss";

function Cart() {
  const isInitialLoadFetchedSuccessfully = useSelector(
    (state: IRootReducerState) =>
      state.singleProduct.isInitialLoadFetchedSuccessfully,
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (!isInitialLoadFetchedSuccessfully) {
      dispatch(fetchCart());
    }

    return () => {
      dispatch(cartResetData());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="cartPage">
      <Header />
      <CartSection className={styles.cartSection} />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default userDetails(Cart as NextPage<any>);

Cart.getInitialProps = async (ctx: INextPageContext) => {
  await loadData(ctx.store.dispatch);
};
