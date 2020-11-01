import React from "react";
import { Grid, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { NavWrapper } from "./Nav.style";

export const Nav = () => (
  <NavWrapper data-testid="nav">
    <Grid columns={1}>
      <Grid.Column>
        <Menu>
          <Menu.Item>
            <NavLink to="/" exact>
              Dashboard
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/add">Add holding</NavLink>
          </Menu.Item>
        </Menu>
      </Grid.Column>
    </Grid>
  </NavWrapper>
);
