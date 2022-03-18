import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NextPageContext } from "next";

import Link from "next/link";

import requireAuth from "@src/hoc/requireAuth";

import { initializeStore } from "@src/store";

import { IAuthReducerMainData } from "@action-reducers/auth/interfaces/auth-reducer-state.interface";
import {
  userDetailsFetchFail,
  fetchUserDetails,
} from "@action-reducers/user-details/user-details.action";

import { IServerSideFunctionReturn } from "@interfaces/server-side-function.interface";

import {
  authLoadCookieDetails,
  tokenRefresh,
} from "@action-reducers/auth/auth.action";

import { isClient } from "@utilities/methods/miscellaneous";
import { getCookie, setCookie, CookieNames } from "@utilities/methods/cookies";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userDetailsFetchFail(["dddd"]));
    // console.log("+++++++++++++");
  }, []);
  return (
    <div>
      gjhkl
      <Link href="/test">ss</Link>
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

    if (authorization.expiresIn < Date.now()) {
      await store.dispatch(tokenRefresh());
    }
  }

  const { accessToken } = store.getState().auth;

  if (accessToken) {
    await store.dispatch(fetchUserDetails());
  } else {
    res?.setHeader("set-cookie", setCookie(CookieNames.AUTHORIZATION, "", -1));
  }

  return { initialReduxState: store.getState(), hasServerFetchedData: true };
};
