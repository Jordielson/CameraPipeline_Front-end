import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["precess", "process per hour"],
  ["disponível", 2],
  ["consumidos", 1],
];

export const options = {
  title: "processos consumidos / hora",
  pieHole: 0.4,
  is3D: false,
};

export function StorageChart() {
  return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="95%"
      data={data}
      options={options}
    />
  );
}
