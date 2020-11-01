import { ActionMap } from "../types";

export enum HoldingsActionTypes {
  FetchAuthToken = "FETCH_AUTH_TOKEN",
  FetchAuthTokenSuccess = "FETCH_AUTH_TOKEN_SUCCESS",
  // TODO: FetchAuthTokenFailure = "FETCH_AUTH_TOKEN_FAILURE",
}

type FetchAuthTokenPayload = { username: string; password: string };

type HoldingsPayloads = {
  [HoldingsActionTypes.FetchAuthToken]: FetchAuthTokenPayload;
  [HoldingsActionTypes.FetchAuthTokenSuccess]: string;
};

export type HoldingsAction = ActionMap<HoldingsPayloads>[keyof ActionMap<
  HoldingsPayloads
>];
