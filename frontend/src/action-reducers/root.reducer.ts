import { combineReducers } from "redux";

import userDetailsReducer from "./user-details/user-details.reducer";

export const reducers = combineReducers({
  userDetails: userDetailsReducer,
});

export type IRootReducerState = ReturnType<typeof reducers>;
