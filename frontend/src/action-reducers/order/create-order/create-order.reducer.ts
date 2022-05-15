import produce from "immer";

import { ICreateOrderReducerState } from "./interfaces/create-order-reducer.interface";
import { ICreateOrderAllActions } from "./interfaces/create-order-action.interface";

import { CreateOrderActions } from "./enums/create-order-actions.enum";

const {
  CREATE_ORDER_FETCH_START,
  CREATE_ORDER_FETCH_SUCCESS,
  CREATE_ORDER_FETCH_FAIL,
  CREATE_ORDER_RESET_DATA,
} = CreateOrderActions;

const defaultCreateOrderReducer: ICreateOrderReducerState = {
  isLoading: false,
  errors: [],
  isInitialLoadFetchedSuccessfully: false,
  id: "",
  createdAt: "",
  address: "",
  paid: {
    amount: 0,
    currency: "",
  },
  products: [],
};

const createOrderReducer = (
  state = defaultCreateOrderReducer,
  action: ICreateOrderAllActions,
): ICreateOrderReducerState =>
  produce(
    state,
    (draft: ICreateOrderReducerState): ICreateOrderReducerState => {
      switch (action?.type) {
        case CREATE_ORDER_FETCH_START: {
          draft.isLoading = true;

          return draft;
        }
        case CREATE_ORDER_FETCH_SUCCESS: {
          return {
            ...draft,
            isLoading: false,
            errors: [],
            isInitialLoadFetchedSuccessfully: true,
            ...action?.payload,
          };
        }

        case CREATE_ORDER_FETCH_FAIL: {
          draft.isLoading = false;
          draft.errors = action?.payload;

          return draft;
        }

        case CREATE_ORDER_RESET_DATA: {
          return {
            ...defaultCreateOrderReducer,
          };
        }

        default: {
          return state;
        }
      }
    },
  );

export default createOrderReducer;
