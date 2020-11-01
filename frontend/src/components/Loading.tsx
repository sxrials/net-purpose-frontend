import React from "react";
import { Dimmer, Loader, Segment } from "semantic-ui-react";

export const Loading = ({ message }: { message: string }) => (
  <Dimmer active>
    <Loader size="large">{message}</Loader>
  </Dimmer>
);

export const InPageLoading = () => (
  <Segment>
    <Dimmer active>
      <Loader size="tiny" />
    </Dimmer>
  </Segment>
);
