import React from "react";

import AuthenticationPage from "@src/non-route-pages/authentication-page/authentication-page";

function requireAuth(WrappedComponent: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function ChildComponent(props: any) {
    return <AuthenticationPage />;
    return <WrappedComponent {...props} />;
  };
}

export default requireAuth;
