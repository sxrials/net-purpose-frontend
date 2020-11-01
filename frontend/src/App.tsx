import React from "react";
import { Container } from "semantic-ui-react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import { Dashboard } from "./pages/Dashboard";
import { NotFound } from "./pages/NotFound";

const App = () => (
  <div className="App">
    <Container style={{ padding: "5rem 0rem" }}>
      <h1>Your Holdings</h1>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </Container>
  </div>
);

export default App;
