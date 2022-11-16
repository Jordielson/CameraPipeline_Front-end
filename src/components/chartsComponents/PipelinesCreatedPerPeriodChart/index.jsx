import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Dias", "Pipelines"],
  ["30", 14],
  ["15", 10],
  ["10", 8],
  ["5", 5],
];

export const options = {
  title: "Novas pipelines criadas nos últimos dias",
  hAxis: { title: "Ultimos dias", titleTextStyle: { color: "#333" } },
  vAxis: { minValue: 0 },
  chartArea: { width: "50%", height: "70%" },
};

export function PipelinesCreated() {
  return (
    <Chart
      chartType="AreaChart"
      width="100%"
      height="160px"
      data={data}
      options={options}
    />
  );
}
