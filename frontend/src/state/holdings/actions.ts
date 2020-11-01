import { ActionMap } from "../types";
import { GetHoldingsResponse, Holding } from "../../api/holdings";

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
  CreateHolding = "CREATE_HOLDING",
  CreateHoldingSuccess = "CREATE_HOLDING_SUCCESS",
  // TODO: CreateHoldingFailure = "CREATE_HOLDING_FAILURE",
  ChangeSort = "CHANGE_SORT",
}

type FetchAuthTokenPayload = { username: string; password: string };
export type FetchHoldingsPayload = { token: string };
export type DeleteHoldingPayload = { token: string; id: number };
export type CreateHoldingPayload = {
  token: string;
  name: string;
  ticker: string;
  value: number;
};
type ChangeSortPayload = { column: string };

type HoldingsPayloads = {
  [HoldingsActionTypes.FetchAuthToken]: FetchAuthTokenPayload;
  [HoldingsActionTypes.FetchAuthTokenSuccess]: string;
  [HoldingsActionTypes.FetchHoldings]: FetchHoldingsPayload;
  [HoldingsActionTypes.FetchHoldingsSuccess]: GetHoldingsResponse;
  [HoldingsActionTypes.DeleteHolding]: DeleteHoldingPayload;
  [HoldingsActionTypes.DeleteHoldingSuccess]: Holding;
  [HoldingsActionTypes.CreateHolding]: CreateHoldingPayload;
  [HoldingsActionTypes.ChangeSort]: ChangeSortPayload;
};

export type HoldingsAction = ActionMap<HoldingsPayloads>[keyof ActionMap<
  HoldingsPayloads
>];
