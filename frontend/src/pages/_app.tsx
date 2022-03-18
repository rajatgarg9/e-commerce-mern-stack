import "@scss/index.scss";

import { Provider } from "react-redux";

import { useStore } from "src/store";

import { IAppProps } from "@interfaces/main-app-file.interface";

function MyApp({ Component, pageProps }: IAppProps) {
  const store = useStore(pageProps?.initialReduxState);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
