import { AnyAction } from "./actions";
import { holdingsReducer, HoldingsState } from "./holdings/reducer";

export interface RootState {
  holdings: HoldingsState;
}

export const initialState: RootState = {
  holdings: {},
};

export const rootReducer = ({ holdings }: RootState, action: AnyAction) => ({
  holdings: holdingsReducer(holdings, action),
});
