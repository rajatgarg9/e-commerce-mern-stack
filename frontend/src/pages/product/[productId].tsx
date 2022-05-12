import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NextPageContext } from "next";

import Header from "@components/common/header/header";
import SingleProductInfoSection from "@components/product-page/single-product-info-section/single-product-info-section";

import requireAuth from "@src/hoc/requireAuth";

import { initializeStore } from "@src/store";

import { IAuthReducerMainData } from "@action-reducers/auth/interfaces/auth-reducer-state.interface";
import { fetchUserDetails } from "@action-reducers/user-details/user-details.action";
import {
  fetchSingleProduct,
  singleProductReset,
} from "@action-reducers/single-product/single-product.action";
import {
  authLoadCookieDetails,
  tokenRefresh,
} from "@action-reducers/auth/auth.action";

import { IServerSideFunctionReturn } from "@src/interfaces/get-initial-props.interface";

import { isClient } from "@utilities/methods/miscellaneous";
import { getCookie, setCookie, CookieNames } from "@utilities/methods/cookies";

import styles from "./product.module.scss";

function Product() {
  const dispatch = useDispatch();
  useEffect(() => {
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

export default requireAuth(Product);

Product.getInitialProps = async (
  ctx: NextPageContext,
): Promise<IServerSideFunctionReturn> => {
  if (isClient()) {
    return { hasServerFetchedData: false };
  }

  const store = initializeStore();

  const { req, res, query: { productId } = {} } = ctx;
  const cookie = req?.headers.cookie;

  const cookieAuthorization = getCookie(CookieNames.AUTHORIZATION, cookie);
  const authorization = (cookieAuthorization &&
    JSON.parse(cookieAuthorization)) as IAuthReducerMainData;

  if (authorization?.accessToken) {
    store.dispatch(authLoadCookieDetails(authorization));

    if (authorization.expiresIn < Date.now()) {
      await store.dispatch(tokenRefresh());
    }
  }

  const { accessToken } = store.getState().auth;

  if (accessToken) {
    await store.dispatch(fetchUserDetails());
    await store.dispatch(fetchSingleProduct(productId as string));
  } else {
    res?.setHeader("set-cookie", setCookie(CookieNames.AUTHORIZATION, "", -1));
  }

  return { initialReduxState: store.getState(), hasServerFetchedData: true };
};
