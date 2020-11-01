import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../state/AppContext";
import { HoldingsActionTypes } from "../state/holdings/actions";
import { InPageLoading } from "../components/Loading";
import { Button } from "semantic-ui-react";
import { formatUsd } from "../utils/currency";

interface Props {
  id: number;
}

export const Details: React.FC<Props> = ({ id }) => {
  const { state, dispatch } = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    if (!state.holdings.authToken) return;
    dispatch({
      type: HoldingsActionTypes.FetchHoldings,
      payload: { token: state.holdings.authToken },
    });
  }, [dispatch, state.holdings.authToken]);

  if (!state.holdings.holdings) return <InPageLoading />;

  const holding = state.holdings.holdings.filter(
    (holding) => holding.id === Number(id)
  )[0];

  const deleteItem = (id: number) => {
    if (!state.holdings.authToken) return;
    dispatch({
      type: HoldingsActionTypes.DeleteHolding,
      payload: { token: state.holdings.authToken, id },
    });
    history.push("/");
  };

  return holding ? (
    <>
      <h2>{holding.name}</h2>
      <p>Ticker: {holding.ticker}</p>
      <p>Current value: {formatUsd(holding.value)} USD</p>
      <Button onClick={() => deleteItem(holding.id)}>
        Remove from portfolio
      </Button>
    </>
  ) : null;
};
