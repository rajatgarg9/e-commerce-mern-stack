import produce from "immer";

import { ISingleProductReducerState } from "./interfaces/single-product-reducer.interface";
import { ISingleProductAllActions } from "./interfaces/single-product-action.interface";

import { SingleProductActions } from "./enums/single-product-actions.enum";

const {
  SINGLE_PRODUCT_FETCH_START,
  SINGLE_PRODUCT_FETCH_SUCCESS,
  SINGLE_PRODUCT_FETCH_FAIL,
  SINGLE_PRODUCT_UPDATE_START,
  SINGLE_PRODUCT_UPDATE_SUCCESS,
  SINGLE_PRODUCT_UPDATE_FAIL,
  SINGLE_PRODUCT_RESET,
} = SingleProductActions;

const defaultSingleProductReducer: ISingleProductReducerState = {
  isLoading: false,
  errors: [],
  isInitialLoadFetchedSuccessfully: false,
  isUpdateInProgress: false,
  updateErrors: [],
  id: "",
  name: "",
  imageUrl: "",
  availableQuantity: 0,
  createdAt: "",
  lastUpdatedAt: "",
  price: {
    amount: 0,
    currency: "",
  },
  seller: {
    id: "",
    name: "",
  },
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
            isInitialLoadFetchedSuccessfully: true,
            errors: [],
            ...action?.payload,
          };
        }

        case SINGLE_PRODUCT_FETCH_FAIL: {
          draft.isLoading = false;
          draft.errors = action?.payload;

          return draft;
        }
        case SINGLE_PRODUCT_UPDATE_START: {
          draft.isUpdateInProgress = true;

          return draft;
        }
        case SINGLE_PRODUCT_UPDATE_SUCCESS: {
          return {
            ...draft,
            isUpdateInProgress: false,
            updateErrors: [],
            ...action?.payload,
          };
        }

        case SINGLE_PRODUCT_UPDATE_FAIL: {
          draft.isUpdateInProgress = false;
          draft.updateErrors = action?.payload;

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
