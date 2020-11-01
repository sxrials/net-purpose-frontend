import { HoldingsAction, HoldingsActionTypes } from "./actions";
import { getAuthToken } from "../../api/getAuthToken";
import { Dispatch } from "react";
import { AnyAction } from "../actions";

export const holdingsAsyncActionHandlers = {
  [HoldingsActionTypes.FetchAuthToken]: ({
    dispatch,
  }: {
    dispatch: Dispatch<any>;
    // @ts-ignore
  }) => async (action) => {
    await new Promise((res) => setTimeout(res, 1000)); // Show off the loading state :)

    const token = await getAuthToken(
      action.payload.username,
      action.payload.password
    );

    console.log("Token fetched: ", token);
  },
};
