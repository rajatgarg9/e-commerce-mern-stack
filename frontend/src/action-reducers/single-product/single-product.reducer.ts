import produce from "immer";

import { ISingleProductReducerState } from "./interfaces/single-product-reducer.interface";
import { ISingleProductAllActions } from "./interfaces/single-product-action.interface";

import { SingleProductActions } from "./enums/single-product-actions.enum";

const {
  SINGLE_PRODUCT_FETCH_START,
  SINGLE_PRODUCT_FETCH_SUCCESS,
  SINGLE_PRODUCT_FETCH_FAIL,
  SINGLE_PRODUCT_RESET,
} = SingleProductActions;

const defaultSingleProductReducer: ISingleProductReducerState = {
  isLoading: true,
  errors: [],
};

const singleProductReducer = (
  state = defaultSingleProductReducer,
  action: ISingleProductAllActions,
): ISingleProductReducerState =>
  produce(
    state,
    (draft: ISingleProductReducerState): ISingleProductReducerState => {
      switch (action?.type) {
        case SINGLE_PRODUCT_FETCH_START: {
          draft.isLoading = true;

          return draft;
        }
        case SINGLE_PRODUCT_FETCH_SUCCESS: {
          return {
            ...draft,
            isLoading: false,
            errors: [],
            ...action?.payload,
          };
        }

        case SINGLE_PRODUCT_FETCH_FAIL: {
          draft.isLoading = false;
          draft.errors = action?.payload;

          return draft;
        }

        case SINGLE_PRODUCT_RESET: {
          return {
            ...defaultSingleProductReducer,
          };
        }

        default: {
          return state;
        }
      }
    },
  );

export default singleProductReducer;
