import { ActionMap } from "../types";
import { GetHoldingsResponse } from "../../api/getHoldings";

export enum HoldingsActionTypes {
  FetchAuthToken = "FETCH_AUTH_TOKEN",
  FetchAuthTokenSuccess = "FETCH_AUTH_TOKEN_SUCCESS",
  // TODO: FetchAuthTokenFailure = "FETCH_AUTH_TOKEN_FAILURE",
  FetchHoldings = "FETCH_HOLDINGS",
  FetchHoldingsSuccess = "FETCH_HOLDINGS_SUCCESS",
  // TODO: FetchHoldingsFailure = 'FETCH_HOLDINGS_FAILURE'
}

type FetchAuthTokenPayload = { username: string; password: string };
export type FetchHoldingsPayload = { token: string };

type HoldingsPayloads = {
  [HoldingsActionTypes.FetchAuthToken]: FetchAuthTokenPayload;
  [HoldingsActionTypes.FetchAuthTokenSuccess]: string;
  [HoldingsActionTypes.FetchHoldings]: FetchHoldingsPayload;
  [HoldingsActionTypes.FetchHoldingsSuccess]: GetHoldingsResponse;
};

export type HoldingsAction = ActionMap<HoldingsPayloads>[keyof ActionMap<
  HoldingsPayloads
>];
