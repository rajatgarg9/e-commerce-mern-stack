import produce from "immer";

import { IUserDetailsReducerState } from "./interfaces/user-details-reducer.interface";
import { IUserDetailsAllActions } from "./interfaces/user-details-action.interface";

import { UserDetailsActions } from "./enums/user-details-actions.enum";

const {
  USER_DETAILS_FETCH_START,
  USER_DETAILS_FETCH_SUCCESS,
  USER_DETAILS_FETCH_FAIL,
  USER_DETAILS_RESET_DATA,
} = UserDetailsActions;

const defaultUserDetailsReducer: IUserDetailsReducerState = {
  isLoading: false,
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

        case USER_DETAILS_RESET_DATA: {
          return { ...draft, ...defaultUserDetailsReducer };
        }

        default: {
          return state;
        }
      }
    },
  );

export default userDetailsReducer;
