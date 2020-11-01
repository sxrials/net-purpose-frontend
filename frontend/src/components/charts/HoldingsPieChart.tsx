import React from "react";
import { PieArcSeries, PieChart } from "reaviz";
import { GetHoldingsResponse } from "../../api/getHoldings";
import { formatUsd } from "../../utils/currency";
import { HoldingsPieChartWrapper, PieWrapper } from "./HoldingsPieChart.style";

type PieChartData = { key: string; data: number }[];

const parseHoldings = (holdings: GetHoldingsResponse): PieChartData =>
  holdings.map((holding) => ({
    key: holding.name,
    data: holding.value,
  }));

const getTotalValue = (holdings: GetHoldingsResponse): string => {
  const totals = holdings.map((holding) => holding.value);
  const grandTotal = totals.reduce((acc, current) => acc + current, 0);
  return formatUsd(grandTotal);
};

interface Props {
  data: GetHoldingsResponse;
}

export const HoldingsPieChart: React.FC<Props> = ({ data }) => (
  <HoldingsPieChartWrapper>
    <PieWrapper>
      <PieChart
        width={350}
        height={250}
        data={parseHoldings(data)}
        series={<PieArcSeries doughnut={true} label={null} />}
      />
    </PieWrapper>
    <p>
      Total portfolio value
      <br />
      <strong>{getTotalValue(data)} USD</strong>
    </p>
  </HoldingsPieChartWrapper>
);
