import React, { ComponentType } from "react";
import { useSelector } from "react-redux";

import PageLoader from "@src/non-route-pages/page-loader/page-loader";
import AuthenticationPage from "@src/non-route-pages/authentication-page/authentication-page";

import { IRootReducerState } from "@action-reducers/root.reducer";

function requireAuth<PropTypes>(WrappedComponent: ComponentType) {
  return function ChildComponent(props: PropTypes) {
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
  };
}

export default requireAuth;
