import { AnyAction } from "../actions";
import { HoldingsActionTypes } from "./actions";
import { GetHoldingsResponse } from "../../api/getHoldings";

export interface HoldingsState {
  authToken?: string;
  holdings?: GetHoldingsResponse;
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
    default:
      return state;
  }
};
