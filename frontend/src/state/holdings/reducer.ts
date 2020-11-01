import { AnyAction } from "../actions";
import { HoldingsActionTypes } from "./actions";

export interface HoldingsState {
  authToken?: string;
}

export const holdingsReducer = (state: HoldingsState, action: AnyAction) => {
  switch (action.type) {
    case HoldingsActionTypes.FetchAuthTokenSuccess:
      return {
        ...state,
        authToken: action.payload,
      };

    default:
      return state;
  }
};
