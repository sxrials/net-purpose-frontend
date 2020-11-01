import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

export const Loading = ({ message }: { message: string }) => (
  <Dimmer active>
    <Loader size="large">{message}</Loader>
  </Dimmer>
);
