import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { GetHoldingsResponse } from "../api/holdings";
import { Icon, Table } from "semantic-ui-react";
import { formatUsd } from "../utils/currency";
import { AppContext } from "../state/AppContext";
import { HoldingsActionTypes } from "../state/holdings/actions";

interface Props {
  data: GetHoldingsResponse;
}

export const HoldingsTable: React.FC<Props> = ({ data }) => {
  const { state, dispatch } = useContext(AppContext);
  const history = useHistory();

  const deleteItem = (id: number) => {
    if (!state.holdings.authToken) return;
    dispatch({
      type: HoldingsActionTypes.DeleteHolding,
      payload: { token: state.holdings.authToken, id },
    });
  };

  return (
    <Table sortable selectable celled striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            onClick={() =>
              dispatch({
                type: HoldingsActionTypes.ChangeSort,
                payload: { column: "ticker" },
              })
            }
          >
            Ticker
          </Table.HeaderCell>
          <Table.HeaderCell
            onClick={() =>
              dispatch({
                type: HoldingsActionTypes.ChangeSort,
                payload: { column: "name" },
              })
            }
          >
            Name
          </Table.HeaderCell>
          <Table.HeaderCell
            onClick={() =>
              dispatch({
                type: HoldingsActionTypes.ChangeSort,
                payload: { column: "value" },
              })
            }
            colSpan="2"
          >
            Value (USD)
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((item) => {
          return (
            <Table.Row
              key={item.ticker}
              onClick={() => history.push(`/details/${item.id}`)}
            >
              <Table.Cell>{item.ticker}</Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell textAlign="right">{formatUsd(item.value)}</Table.Cell>
              <Table.Cell collapsing>
                <Icon name="trash" onClick={() => deleteItem(item.id)} />
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};
