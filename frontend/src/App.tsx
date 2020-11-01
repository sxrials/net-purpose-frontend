import React from "react";
import { Container } from "semantic-ui-react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import { Dashboard } from "./pages/Dashboard";
import { NotFound } from "./pages/NotFound";
import { AddHolding } from "./pages/AddHolding";
import { Nav } from "./components/Nav";

const App = () => (
  <div className="App">
    <Container style={{ padding: "5rem 0rem" }}>
      <h1>Your Holdings</h1>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/add" exact component={AddHolding} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Container>
  </div>
);

export default App;
