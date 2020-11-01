import { AnyAction } from "../actions";
import { HoldingsActionTypes } from "./actions";

export interface HoldingsState {}

export const holdingsReducer = (state: HoldingsState, action: AnyAction) => {
  switch (action.type) {
    case HoldingsActionTypes.FetchAuthToken:
      console.log("FetchAuthToken dispatched", action); // FIXME
      return state;
    default:
      return state;
  }
};
