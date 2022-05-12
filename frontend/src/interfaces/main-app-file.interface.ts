import type { AppProps } from "next/app";

import { IServerSideFunctionDataFetchReturn } from "./get-initial-props.interface";

interface IAppPageProps
  extends Omit<IServerSideFunctionDataFetchReturn, "hasServerFetchedData"> {
  hasServerFetchedData: boolean;
}

export type IAppProps = {
  pageProps: IAppPageProps;
} & Omit<AppProps<IAppPageProps>, "pageProps">;
