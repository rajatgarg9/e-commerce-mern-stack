import { useEffect } from "react";
import { NextPageContext } from "next";
import { useDispatch } from "react-redux";

import Header from "@components/common/header/header";
import ProductListSection from "@components/product-list-page/product-list-section/product-list-section";

import requireAuth from "@src/hoc/requireAuth";

import { initializeStore } from "@src/store";

import { IAuthReducerMainData } from "@action-reducers/auth/interfaces/auth-reducer-state.interface";
import { fetchUserDetails } from "@action-reducers/user-details/user-details.action";
import {
  fetchProductList,
  productListReset,
} from "@action-reducers/product-list/product-list.action";
import {
  authLoadCookieDetails,
  tokenRefresh,
} from "@action-reducers/auth/auth.action";

import { IServerSideFunctionReturn } from "@interfaces/server-side-function.interface";

import { isClient, getDaysFromSeconds } from "@utilities/methods/miscellaneous";
import { getCookie, setCookie, CookieNames } from "@utilities/methods/cookies";

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

export default requireAuth(Home);

Home.getInitialProps = async (
  ctx: NextPageContext,
): Promise<IServerSideFunctionReturn> => {
  if (isClient()) {
    return { hasServerFetchedData: false };
  }

  const store = initializeStore();

  const { req, res } = ctx;
  const cookie = req?.headers.cookie;

  const cookieAuthorization = getCookie(CookieNames.AUTHORIZATION, cookie);
  const authorization = (cookieAuthorization &&
    JSON.parse(cookieAuthorization)) as IAuthReducerMainData;

  if (authorization?.accessToken) {
    store.dispatch(authLoadCookieDetails(authorization));

    if (new Date(authorization.expiresAt).getTime() < Date.now()) {
      await store.dispatch(tokenRefresh());
    }
  }
  const { accessToken } = store.getState().auth;

  await store.dispatch(tokenRefresh());

  if (accessToken) {
    await store.dispatch(fetchUserDetails());
    await store.dispatch(fetchProductList());
  }

  res?.setHeader(
    "set-cookie",
    setCookie(
      CookieNames.AUTHORIZATION,
      JSON.stringify({
        accessToken: store.getState().auth.accessToken,
        refreshToken: store.getState().auth.refreshToken,
        expiresIn: store.getState().auth.expiresIn,
        expiresAt: store.getState().auth.expiresAt,
        tokenType: store.getState().auth.tokenType,
      }),
      getDaysFromSeconds(store.getState().auth.expiresIn),
    ),
  );

  return { initialReduxState: store.getState(), hasServerFetchedData: true };
};
