import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NextPage } from "next";
import { useRouter } from "next/router";

import Header from "@components/common/header/header";
import SingleProductInfoSection from "@components/product-page/single-product-info-section/single-product-info-section";

import userDetails from "@src/hoc/userDetails";

import {
  fetchSingleProduct,
  singleProductReset,
} from "@action-reducers/single-product/single-product.action";

import { loadData } from "@src/pages-utility/product-page";

import { IRootReducerState } from "@action-reducers/root.reducer";
import { INextPageContext } from "@interfaces/get-initial-props.interface";

import styles from "./product.module.scss";

function Product() {
  const isInitialLoadFetchedSuccessfully = useSelector(
    (state: IRootReducerState) =>
      state.singleProduct.isInitialLoadFetchedSuccessfully,
  );
  const router = useRouter();
  const { productId } = router.query;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!isInitialLoadFetchedSuccessfully) {
      dispatch(fetchSingleProduct(productId as string));
    }

    return () => {
      dispatch(singleProductReset());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="productPage">
      <Header />
      <SingleProductInfoSection className={styles.snglPodtInfoSec} />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default userDetails(Product as NextPage<any>);

Product.getInitialProps = async (ctx: INextPageContext) => {
  const { query: { productId } = {} } = ctx;

  await loadData(ctx.store.dispatch, productId as string);
};
