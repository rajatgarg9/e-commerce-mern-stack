import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Header from "@components/common/header/header";
import ProductListSection from "@components/product-list-page/product-list-section/product-list-section";

import requireAuth from "@src/hoc/requireAuth";
import userDetails from "@src/hoc/userDetails";

import {
  fetchProductList,
  productListReset,
} from "@action-reducers/product-list/product-list.action";

import { INextPageContext } from "@interfaces/get-initial-props.interface";

import styles from "./index.module.scss";

function Home({ hasServerFetchedData }: any) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!hasServerFetchedData) {
      dispatch(fetchProductList());
    }

    return () => {
      dispatch(productListReset());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      <ProductListSection className={styles.productListSec} />
    </div>
  );
}

export default requireAuth(userDetails(Home));

Home.getInitialProps = async (ctx: INextPageContext) => {
  await ctx.store.dispatch(fetchProductList());
};
