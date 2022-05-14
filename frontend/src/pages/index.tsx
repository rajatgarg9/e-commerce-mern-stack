import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NextPage } from "next";

import Header from "@components/common/header/header";
import ProductListSection from "@components/product-list-page/product-list-section/product-list-section";

import userDetails from "@src/hoc/userDetails";

import { productListReset } from "@action-reducers/product-list/product-list.action";

import { loadData } from "@src/pages-utility/home-page";

import { INextPageContext } from "@interfaces/get-initial-props.interface";

import { IPageCommonProps } from "@interfaces/page-common-props.interface";

import styles from "./index.module.scss";

function Home({ hasServerFetchedData }: IPageCommonProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!hasServerFetchedData) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      loadData(dispatch);
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default userDetails(Home as NextPage<any>);

Home.getInitialProps = async (ctx: INextPageContext) => {
  await loadData(ctx.store.dispatch);
};
