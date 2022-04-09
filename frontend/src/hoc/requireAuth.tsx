import React from "react";
import { useSelector } from "react-redux";
import { NextPageContext, NextPage } from "next";

import PageLoader from "@src/non-route-pages/page-loader/page-loader";
import AuthenticationPage from "@src/non-route-pages/authentication-page/authentication-page";

import { IRootReducerState } from "@action-reducers/root.reducer";

function requireAuth<PropTypes>(WrappedComponent: NextPage<PropTypes>) {
  function ChildComponent(props: PropTypes) {
    const accessToken = useSelector(
      (state: IRootReducerState) => state.auth.accessToken,
    );
    const isTokenRefreshInProgress = useSelector(
      (state: IRootReducerState) => state.auth.isTokenRefreshInProgress,
    );

    if (isTokenRefreshInProgress) {
      return <PageLoader {...props} />;
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
