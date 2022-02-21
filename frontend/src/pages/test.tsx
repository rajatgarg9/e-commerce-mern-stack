import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { NextPageContext } from "next";

import { userDetailsFetchFail } from "@action-reducers/user-details/user-details.action";

// import { isClient } from "@utilities/methods/miscellaneous";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userDetailsFetchFail(["dddd"]));
    // console.log("+++++++++++++");
  }, []);
  return <div>gjhkl</div>;
}

export default Home;

// Home.getInitialProps = (ctx: NextPageContext) => {
//   const { req } = ctx;
//   // const { cookie } = req?.header;

//   console.log(req?.headers.cookie);
//   // res?.setHeader("set-cookie", "i=a3fWa; Max-Age=2592000");

//   // console.log(res);
//   return { initialReduxState: { a: 2 } };
// };
