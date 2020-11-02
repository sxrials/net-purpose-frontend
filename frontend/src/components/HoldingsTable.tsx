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

  const handleRowClick = (id: number) => {
    history.push(`/details/${id}`);
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
            <Table.Row key={item.ticker}>
              <Table.Cell onClick={() => handleRowClick(item.id)}>
                {item.ticker}
              </Table.Cell>
              <Table.Cell onClick={() => handleRowClick(item.id)}>
                {item.name}
              </Table.Cell>
              <Table.Cell
                textAlign="right"
                onClick={() => handleRowClick(item.id)}
              >
                {formatUsd(item.value)}
              </Table.Cell>
              <Table.Cell collapsing onClick={() => deleteItem(item.id)}>
                <Icon name="trash" />
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};
