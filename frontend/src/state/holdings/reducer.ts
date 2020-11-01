import { AnyAction } from "../actions";
import { HoldingsActionTypes } from "./actions";

export interface HoldingsState {}

export const holdingsReducer = (state: HoldingsState, action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};
