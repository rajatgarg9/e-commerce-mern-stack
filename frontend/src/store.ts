import { useMemo } from "react";
import { createStore, applyMiddleware, Store, AnyAction } from "redux";
import thunkMiddleware, { ThunkDispatch } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { AxiosInstance } from "axios";
import { reducers, IRootReducerState } from "@action-reducers/root.reducer";

import { axiosInstance } from "@utilities/methods/miscellaneous";
import { getBaseApiUrl } from "@utilities/methods/getEnvironmentVariables";

let store: // eslint-disable-next-line @typescript-eslint/ban-types
| (Store<IRootReducerState> & {
      dispatch: ThunkDispatch<IRootReducerState, AxiosInstance, AnyAction>;
    })
  | undefined;

function initStore(initialState?: IRootReducerState) {
  return createStore(
    reducers,
    initialState,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call
    composeWithDevTools(
      applyMiddleware(
        thunkMiddleware.withExtraArgument(
          axiosInstance(`${getBaseApiUrl()}/api/v1`),
        ),
      ),
    ),
  );
}

export const initializeStore = (preloadedState?: IRootReducerState) => {
  let newStore = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    newStore = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return newStore;
  // Create the store once in the client
  if (!store) {
    store = newStore;
  }

  return newStore;
};

export function useStore(initialState?: IRootReducerState) {
  return useMemo(() => initializeStore(initialState), [initialState]);
}

export const stores = store;
