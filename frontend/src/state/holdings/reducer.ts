import _ from "lodash";
import { AnyAction } from "../actions";
import { HoldingsActionTypes } from "./actions";
import { GetHoldingsResponse } from "../../api/holdings";

export interface HoldingsState {
  authToken?: string;
  holdings?: GetHoldingsResponse;
  sorting: {
    column: string;
  };
}

export const holdingsReducer = (state: HoldingsState, action: AnyAction) => {
  switch (action.type) {
    case HoldingsActionTypes.FetchAuthTokenSuccess:
      return {
        ...state,
        authToken: action.payload,
      };
    case HoldingsActionTypes.FetchHoldingsSuccess:
      return {
        ...state,
        holdings: action.payload,
      };
    case HoldingsActionTypes.DeleteHoldingSuccess:
      return state.holdings
        ? {
            ...state,
            holdings: [
              ...state.holdings.filter(
                (holding) => holding.id !== action.payload.id
              ),
            ],
          }
        : state;
    case HoldingsActionTypes.ChangeSort:
      if (!state.holdings) return state;
      if (state.sorting.column === action.payload.column) {
        return {
          ...state,
          holdings: state.holdings.reverse(),
        };
      }
      return {
        ...state,
        holdings: _.sortBy(state.holdings, [action.payload.column]),
        sorting: {
          column: action.payload.column,
        },
      };
    default:
      return state;
  }
};
