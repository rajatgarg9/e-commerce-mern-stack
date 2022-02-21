import { combineReducers } from "redux";

import userDetailsReducer from "./user-details/user-details.reducer";
import authReducer from "./auth/auth.reducer";

export const reducers = combineReducers({
  userDetails: userDetailsReducer,
  auth: authReducer,
});

export type IRootReducerState = ReturnType<typeof reducers>;
