import React from "react";
import { useSelector } from "react-redux";
import { NextPageContext, NextPage } from "next";

import PopupLoader from "@src/components/common/popup-loader/popup-loader";
import AuthenticationPage from "@src/non-route-pages/authentication-page/authentication-page";

import { IRootReducerState } from "@action-reducers/root.reducer";

function requireAuth<PropTypes>(WrappedComponent: NextPage<PropTypes>): {
  (props: PropTypes): JSX.Element;
} {
  function ChildComponent(props: PropTypes) {
    const accessToken = useSelector(
      (state: IRootReducerState) => state.auth.accessToken,
    );
    const isTokenRefreshInProgress = useSelector(
      (state: IRootReducerState) => state.auth.isTokenRefreshInProgress,
    );

    if (!accessToken) {
      return <AuthenticationPage />;
    }

    return (
      <>
        <WrappedComponent {...props} />
        {isTokenRefreshInProgress && <PopupLoader {...props} />}
      </>
    );
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
