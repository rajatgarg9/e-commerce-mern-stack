import produce from "immer";

import { IProductListReducerState } from "./interfaces/product-list-reducer.interface";
import { IProductListAllActions } from "./interfaces/product-list-action.interface";

import { ProductListActions } from "./enums/product-list-actions.enum";

const {
  PRODUCT_LIST_FETCH_START,
  PRODUCT_LIST_FETCH_SUCCESS,
  PRODUCT_LIST_FETCH_FAIL,
  PRODUCT_LIST_LOAD_MORE_START,
  PRODUCT_LIST_LOAD_MORE_SUCCESS,
  PRODUCT_LIST_LOAD_MORE_FAIL,
  PRODUCT_LIST_RESET,
} = ProductListActions;

const defaultProductListReducer: IProductListReducerState = {
  isLoading: false,
  errors: [],
  products: [],
  isLoadingMoreInProgress: false,
  loadMoreError: [],
  pagination: {
    limit: 0,
    lastPage: 0,
    currentPage: 0,
    total: 0,
  },
};

const productListReducer = (
  state = defaultProductListReducer,
  action: IProductListAllActions,
): IProductListReducerState =>
  produce(
    state,
    (draft: IProductListReducerState): IProductListReducerState => {
      switch (action?.type) {
        case PRODUCT_LIST_FETCH_START: {
          draft.isLoading = true;

          return draft;
        }
        case PRODUCT_LIST_FETCH_SUCCESS: {
          return {
            ...draft,
            isLoading: false,
            errors: [],
            ...action?.payload,
          };
        }

        case PRODUCT_LIST_FETCH_FAIL: {
          draft.isLoading = false;
          draft.errors = action?.payload;

          return draft;
        }

        case PRODUCT_LIST_LOAD_MORE_START: {
          draft.isLoadingMoreInProgress = true;
          return draft;
        }
        case PRODUCT_LIST_LOAD_MORE_SUCCESS: {
          return {
            ...draft,
            isLoadingMoreInProgress: false,
            loadMoreError: [],
            ...action?.payload,
          };
        }

        case PRODUCT_LIST_LOAD_MORE_FAIL: {
          draft.isLoadingMoreInProgress = false;
          draft.loadMoreError = action?.payload;

          return draft;
        }

        case PRODUCT_LIST_RESET: {
          return {
            ...defaultProductListReducer,
          };
        }

        default: {
          return state;
        }
      }
    },
  );

export default productListReducer;
