import produce from "immer";

import { ICartReducerState } from "./interfaces/cart-reducer.interface";
import { ICartAllActions } from "./interfaces/cart-action.interface";

import { CartActions } from "./enums/cart-actions.enum";

const {
  CART_FETCH_START,
  CART_FETCH_SUCCESS,
  CART_FETCH_FAIL,
  CART_FETCH_UPDATE_START,
  CART_FETCH_UPDATE_SUCCESS,
  CART_FETCH_UPDATE_FAIL,
  CART_CLEAR_UPDATE_ERRORS,
  CART_RESET_DATA,
} = CartActions;

const defaultCartReducer: ICartReducerState = {
  isLoading: false,
  errors: [],
  updateErrors: [],
  isUpdateInProgress: false,
  id: "",
  lastUpdatedAt: "",
  products: [],
};

const cartReducer = (
  state = defaultCartReducer,
  action: ICartAllActions,
): ICartReducerState =>
  produce(state, (draft: ICartReducerState): ICartReducerState => {
    switch (action?.type) {
      case CART_FETCH_START: {
        draft.isLoading = true;

        return draft;
      }
      case CART_FETCH_SUCCESS: {
        return {
          ...draft,
          isLoading: false,
          errors: [],
          ...action?.payload,
        };
      }

      case CART_FETCH_FAIL: {
        draft.isLoading = false;
        draft.errors = action?.payload;

        return draft;
      }

      case CART_FETCH_UPDATE_START: {
        draft.isUpdateInProgress = true;
        return draft;
      }
      case CART_FETCH_UPDATE_SUCCESS: {
        return {
          ...draft,
          isUpdateInProgress: false,
          updateErrors: [],
          ...action?.payload,
        };
      }

      case CART_FETCH_UPDATE_FAIL: {
        draft.isUpdateInProgress = false;
        draft.updateErrors = action?.payload;

        return draft;
      }

      case CART_CLEAR_UPDATE_ERRORS: {
        draft.updateErrors = [];

        return draft;
      }

      case CART_RESET_DATA: {
        return {
          ...defaultCartReducer,
        };
      }

      default: {
        return state;
      }
    }
  });

export default cartReducer;
