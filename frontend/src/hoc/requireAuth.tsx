/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react";
import { useSelector } from "react-redux";
import { NextPageContext } from "next";

import PageLoader from "@src/non-route-pages/page-loader/page-loader";
import AuthenticationPage from "@src/non-route-pages/authentication-page/authentication-page";

import { IRootReducerState } from "@action-reducers/root.reducer";

function requireAuth<PropTypes>(WrappedComponent: any) {
  function ChildComponent(props: PropTypes) {
    const accessToken = useSelector(
      (state: IRootReducerState) => state.auth.accessToken,
    );
    const isTokenRefreshInProgress = useSelector(
      (state: IRootReducerState) => state.auth.isTokenRefreshInProgress,
    );

    if (isTokenRefreshInProgress) {
      return <PageLoader />;
    }

    if (!accessToken) {
      return <AuthenticationPage />;
    }

    return <WrappedComponent {...props} />;
  }

  ChildComponent.getInitialProps = async (ctx: NextPageContext) => {
    const pageProps =
      WrappedComponent?.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));
    // Return props.

    return { ...pageProps };
  };

  return ChildComponent;
}

export default requireAuth;
