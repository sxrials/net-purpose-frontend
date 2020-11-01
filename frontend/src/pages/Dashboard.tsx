import React, { useContext, useEffect } from "react";
import { AppContext } from "../state/AppContext";
import { HoldingsActionTypes } from "../state/holdings/actions";

export const Dashboard = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (!state.holdings.authToken) return;
    dispatch({
      type: HoldingsActionTypes.FetchHoldings,
      payload: { token: state.holdings.authToken },
    });
  }, [dispatch, state.holdings.authToken]);

  return <h2>Dashboard</h2>;
};
