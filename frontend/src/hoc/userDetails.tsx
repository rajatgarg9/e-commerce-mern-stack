import React from "react";
import { useSelector } from "react-redux";
import { NextPageContext, NextPage } from "next";

import PageLoader from "@src/non-route-pages/page-loader/page-loader";

import { IRootReducerState } from "@action-reducers/root.reducer";

function userDetails<PropTypes>(WrappedComponent: NextPage<PropTypes>): {
  (props: PropTypes): JSX.Element;
} {
  function ChildComponent(props: PropTypes) {
    const id = useSelector((state: IRootReducerState) => state.userDetails.id);

    if (!id) {
      return <PageLoader {...props} />;
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

export default userDetails;
