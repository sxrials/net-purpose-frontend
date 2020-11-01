import React, { useState } from "react";
import { Container, Form, Grid } from "semantic-ui-react";

interface FormState {
  name: string;
  ticker: string;
  value: number;
}

export const AddHolding = () => {
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

    console.log(state);
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
