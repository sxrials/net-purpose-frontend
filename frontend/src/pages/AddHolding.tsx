import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "semantic-ui-react";
import { AppContext } from "../state/AppContext";
import { HoldingsActionTypes } from "../state/holdings/actions";

interface FormState {
  name: string;
  ticker: string;
  value: number;
}

export const AddHolding = () => {
  const { state: appState, dispatch } = useContext(AppContext);
  const history = useHistory();
  const [state, setState] = useState<FormState>({
    name: "",
    ticker: "",
    value: 0,
  });

  const handleChange = (evt: any) => {
    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    // TODO: This implementation is terribly quick and dirty
    if (state.name === "" || state.ticker === "")
      return alert("Please complete all fields");

    if (!appState.holdings.authToken) return;

    dispatch({
      type: HoldingsActionTypes.CreateHolding,
      payload: { token: appState.holdings.authToken, ...state },
    });

    history.push("/");
  };

  return (
    <>
      <h2>Add holding</h2>
      <Form>
        <label>
          Name:
          <Form.Input
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Ticker:
          <Form.Input
            type="text"
            name="ticker"
            value={state.ticker}
            onChange={handleChange}
          />
        </label>

        <label>
          Value (USD):
          <Form.Input
            type="number"
            name="value"
            value={state.value}
            onChange={handleChange}
          />
        </label>
        <Form.Button type="button" onClick={handleSubmit}>
          Add
        </Form.Button>
      </Form>
    </>
  );
};
