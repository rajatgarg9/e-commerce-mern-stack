import produce from "immer";

import { IUserDetailsReducerState } from "./interfaces/user-details-reducer.interface";
import { IUserDetailsAllActions } from "./interfaces/user-details-action.interface";

import { UserDetailsActionsTypes } from "./enums/user-details-actions-types.enum";

const {
  USER_DETAILS_FETCH_START,
  USER_DETAILS_FETCH_SUCCESS,
  USER_DETAILS_FETCH_FAIL,
} = UserDetailsActionsTypes;

const defaultUserDetailsReducer: IUserDetailsReducerState = {
  isLoading: true,
  errors: [],
  id: "",
  name: "",
  email: "",
};

const userDetailsReducer = (
  state = defaultUserDetailsReducer,
  action: IUserDetailsAllActions,
): IUserDetailsReducerState =>
  produce(
    state,
    (draft: IUserDetailsReducerState): IUserDetailsReducerState => {
      switch (action?.type) {
        case USER_DETAILS_FETCH_START: {
          draft.isLoading = true;

          return draft;
        }
        case USER_DETAILS_FETCH_SUCCESS: {
          draft.isLoading = false;
          draft.errors = [];
          return {
            ...draft,
            isLoading: false,
            errors: [],
            ...action?.payload,
          };
        }

        case USER_DETAILS_FETCH_FAIL: {
          draft.isLoading = false;
          draft.errors = action?.payload;

          return draft;
        }

        default: {
          return state;
        }
      }
    },
  );

export default userDetailsReducer;
