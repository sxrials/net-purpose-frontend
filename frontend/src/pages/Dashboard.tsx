import React, { useContext, useEffect } from "react";
import { AppContext } from "../state/AppContext";
import { HoldingsActionTypes } from "../state/holdings/actions";
import { Grid } from "semantic-ui-react";
import { InPageLoading } from "../components/Loading";
import { HoldingsTable } from "../components/HoldingsTable";

export const Dashboard = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (!state.holdings.authToken) return;
    dispatch({
      type: HoldingsActionTypes.FetchHoldings,
      payload: { token: state.holdings.authToken },
    });
  }, [dispatch, state.holdings.authToken]);

  return state.holdings.holdings ? (
    <Grid columns={1}>
      <Grid.Column>
        <HoldingsTable data={state.holdings.holdings} />
      </Grid.Column>
    </Grid>
  ) : (
    <InPageLoading />
  );
};
