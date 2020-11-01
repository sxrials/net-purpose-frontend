import { HoldingsAction, HoldingsActionTypes } from "./actions";
import { getAuthToken } from "../../api/getAuthToken";
import { Dispatch } from "react";
import { AnyAction } from "../actions";
import { createHolding, deleteHolding, getHoldings } from "../../api/holdings";

interface AsyncActionHandlerProps {
  dispatch: Dispatch<any>;
}

export const holdingsAsyncActionHandlers = {
  [HoldingsActionTypes.FetchAuthToken]: ({
    dispatch,
  }: AsyncActionHandlerProps) => async (action: any) => {
    await new Promise((res) => setTimeout(res, 1000)); // Show off the loading state :)
    const token = await getAuthToken(
      action.payload.username,
      action.payload.password
    );
    dispatch({
      type: HoldingsActionTypes.FetchAuthTokenSuccess,
      payload: token,
    });
  },

  [HoldingsActionTypes.FetchHoldings]: ({
    dispatch,
  }: AsyncActionHandlerProps) => async (action: any) => {
    await new Promise((res) => setTimeout(res, 1000));
    const holdings = await getHoldings(action.payload);
    dispatch({
      type: HoldingsActionTypes.FetchHoldingsSuccess,
      payload: holdings,
    });
  },

  [HoldingsActionTypes.DeleteHolding]: ({
    dispatch,
  }: AsyncActionHandlerProps) => async (action: any) => {
    const deletedHolding = await deleteHolding(action.payload);
    dispatch({
      type: HoldingsActionTypes.DeleteHoldingSuccess,
      payload: deletedHolding,
    });
  },

  [HoldingsActionTypes.CreateHolding]: ({
    dispatch,
  }: AsyncActionHandlerProps) => async (action: any) => {
    const createdHolding = await createHolding(action.payload);
    dispatch({
      type: HoldingsActionTypes.CreateHoldingSuccess,
    });
  },
};
