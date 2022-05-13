import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NextPage } from "next";

import { initializeStore } from "@src/store";

import PageLoader from "@src/non-route-pages/page-loader/page-loader";

import { IRootReducerState } from "@action-reducers/root.reducer";

import { isClient } from "@utilities/methods/miscellaneous";
import { getCookie, setCookie, CookieNames } from "@utilities/methods/cookies";

import { authLoadCookieDetails } from "@action-reducers/auth/auth.action";
import { fetchUserDetails } from "@action-reducers/user-details/user-details.action";

import { INextPageContext } from "@interfaces/get-initial-props.interface";
import { IPageCommonProps } from "@interfaces/page-common-props.interface";

import { IAuthReducerMainData } from "@action-reducers/auth/interfaces/auth-reducer-state.interface";

function userDetails<PropTypes extends IPageCommonProps>(
  WrappedComponent: NextPage<PropTypes>,
): {
  (props: PropTypes): JSX.Element;
} {
  function ChildComponent(props: PropTypes) {
    const id = useSelector((state: IRootReducerState) => state.userDetails.id);
    const refreshToken = useSelector(
      (state: IRootReducerState) => state.auth.refreshToken,
    );
    const dispatch = useDispatch();

    const { hasServerFetchedData } = props || {};

    useEffect(() => {
      if (!hasServerFetchedData && refreshToken) {
        dispatch(fetchUserDetails(true));
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshToken]);

    if (refreshToken && !id) {
      return <PageLoader {...props} />;
    }

    return <WrappedComponent {...props} />;
  }

  ChildComponent.getInitialProps = async (ctx: INextPageContext) => {
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
    }

    await store.dispatch(fetchUserDetails());

    // eslint-disable-next-line no-param-reassign
    ctx.store = store;

    const wrappedComponentProps =
      (WrappedComponent?.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx))) ||
      {};
    // Return props.

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
        365,
      ),
    );

    return {
      hasServerFetchedData: true,
      initialReduxState: store.getState(),
      ...wrappedComponentProps,
    };
  };

  return ChildComponent;
}

export default userDetails;
