import React from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export const Nav = () => (
  <div data-testid="nav">
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
  </div>
);
