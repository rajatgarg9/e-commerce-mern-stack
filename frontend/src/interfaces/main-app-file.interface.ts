import type { AppProps } from "next/app";

import { IServerSideFunctionDataFetchReturn } from "./server-side-function.interface";

interface IAppPageProps
  extends Omit<IServerSideFunctionDataFetchReturn, "hasServerFetchedData"> {
  hasServerFetchedData: boolean;
}

export type IAppProps = {
  pageProps: IAppPageProps;
} & Omit<AppProps<IAppPageProps>, "pageProps">;
