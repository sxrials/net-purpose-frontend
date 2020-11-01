import { ActionMap } from "../types";
import { GetHoldingsResponse, Holding } from "../../api/getHoldings";

export enum HoldingsActionTypes {
  FetchAuthToken = "FETCH_AUTH_TOKEN",
  FetchAuthTokenSuccess = "FETCH_AUTH_TOKEN_SUCCESS",
  // TODO: FetchAuthTokenFailure = "FETCH_AUTH_TOKEN_FAILURE",
  FetchHoldings = "FETCH_HOLDINGS",
  FetchHoldingsSuccess = "FETCH_HOLDINGS_SUCCESS",
  // TODO: FetchHoldingsFailure = 'FETCH_HOLDINGS_FAILURE'
  DeleteHolding = "DELETE_HOLDING",
  DeleteHoldingSuccess = "DELETE_HOLDING_SUCCESS",
  // TODO: DeleteHoldingFailure = "DELETE_HOLDING_FAILURE",
}

type FetchAuthTokenPayload = { username: string; password: string };
export type FetchHoldingsPayload = { token: string };
export type DeleteHoldingPayload = { token: string; id: number };
type DeleteHoldingSuccessPayload = Holding;

type HoldingsPayloads = {
  [HoldingsActionTypes.FetchAuthToken]: FetchAuthTokenPayload;
  [HoldingsActionTypes.FetchAuthTokenSuccess]: string;
  [HoldingsActionTypes.FetchHoldings]: FetchHoldingsPayload;
  [HoldingsActionTypes.FetchHoldingsSuccess]: GetHoldingsResponse;
  [HoldingsActionTypes.DeleteHolding]: DeleteHoldingPayload;
  [HoldingsActionTypes.DeleteHoldingSuccess]: DeleteHoldingSuccessPayload;
};

export type HoldingsAction = ActionMap<HoldingsPayloads>[keyof ActionMap<
  HoldingsPayloads
>];
