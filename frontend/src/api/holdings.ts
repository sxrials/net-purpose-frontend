import {
  DeleteHoldingPayload,
  FetchHoldingsPayload,
} from "../state/holdings/actions";

export interface Holding {
  name: string;
  ticker: string;
  value: number;
  id: number;
  owner_id: number;
}

export type GetHoldingsResponse = Holding[];

export const getHoldings = async (
  payload: FetchHoldingsPayload
): Promise<GetHoldingsResponse> => {
  const response = await fetch("/api/v1/holdings/", {
    headers: {
      Authorization: `Bearer ${payload.token}`,
    },
  });
  return response.json();
};

export const deleteHolding = async (
  payload: DeleteHoldingPayload
): Promise<Holding> => {
  const response = await fetch(`/api/v1/holdings/${payload.id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${payload.token}`,
    },
  });
  return response.json();
};
