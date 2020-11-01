import { ActionMap } from "../types";

export enum HoldingsActionTypes {
  FetchAuthToken = "FETCH_AUTH_TOKEN",
}

type FetchAuthTokenPayload = { username: string; password: string };

type HoldingsPayloads = {
  [HoldingsActionTypes.FetchAuthToken]: FetchAuthTokenPayload;
};

export type HoldingsAction = ActionMap<HoldingsPayloads>[keyof ActionMap<
  HoldingsPayloads
>];
