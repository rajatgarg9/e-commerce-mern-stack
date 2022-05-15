import produce from "immer";

import { IGetOrdersReducerState } from "./interfaces/get-orders-reducer.interface";
import { IGetOrdersAllActions } from "./interfaces/get-orders-action.interface";

import { GetOrdersActions } from "./enums/get-orders-actions.enum";

const {
  GET_ORDERS_FETCH_START,
  GET_ORDERS_FETCH_SUCCESS,
  GET_ORDERS_FETCH_FAIL,
  GET_ORDERS_RESET_DATA,
} = GetOrdersActions;

const defaultGetOrdersReducer: IGetOrdersReducerState = {
  isLoading: false,
  errors: [],
  list: [],
  isInitialLoadFetchedSuccessfully: false,
};

const getOrdersReducer = (
  state = defaultGetOrdersReducer,
  action: IGetOrdersAllActions,
): IGetOrdersReducerState =>
  produce(state, (draft: IGetOrdersReducerState): IGetOrdersReducerState => {
    switch (action?.type) {
      case GET_ORDERS_FETCH_START: {
        draft.isLoading = true;

        return draft;
      }
      case GET_ORDERS_FETCH_SUCCESS: {
        return {
          ...draft,
          isLoading: false,
          errors: [],
          isInitialLoadFetchedSuccessfully: true,
          list: action?.payload,
        };
      }

      case GET_ORDERS_FETCH_FAIL: {
        draft.isLoading = false;
        draft.errors = action?.payload;

        return draft;
      }

      case GET_ORDERS_RESET_DATA: {
        return {
          ...defaultGetOrdersReducer,
        };
      }

      default: {
        return state;
      }
    }
  });

export default getOrdersReducer;
