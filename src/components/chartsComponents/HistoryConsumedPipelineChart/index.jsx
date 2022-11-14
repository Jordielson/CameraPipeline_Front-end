import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  [
    "",
    "Pipeline Exemple 1",
    "Pipeline Exemple 2",
    "Pipeline Exemple 3",
  ],
  [1, 37.8, 80.8, 41.8],
  [2, 30.9, 69.5, 32.4],
  [3, 25.4, 57, 25.7],
  [4, 11.7, 18.8, 10.5],
  [5, 11.9, 17.6, 10.4],
  [6, 8.8, 13.6, 7.7],
  [7, 7.6, 12.3, 9.6],
  [8, 12.3, 29.2, 10.6],
  [9, 16.9, 42.9, 14.8],
  [10, 12.8, 30.9, 11.6],
  [11, 5.3, 7.9, 4.7],
  [12, 6.6, 8.4, 5.2],
  [13, 4.8, 6.3, 3.6],
  [14, 4.2, 6.2, 3.4],
  [15, 4.2, 6.2, 3.4],
  [16, 4.2, 6.2, 3.4],
  [17, 4.2, 6.2, 3.4],
  [18, 4.2, 6.2, 3.4],
  [19, 4.2, 6.2, 3.4],
  [20, 4.2, 6.2, 3.4],
  [21, 4.2, 6.2, 3.4],
  [22, 4.2, 6.2, 3.4],
  [23, 4.2, 6.2, 3.4],
  [24, 4.2, 6.2, 3.4],
  [25, 4.2, 6.2, 3.4],
  [26, 4.2, 6.2, 3.4],
  [27, 4.2, 6.2, 3.4],
  [28, 4.2, 6.2, 3.4],
  [29, 4.2, 6.2, 3.4],
  [30, null, null , null ],
];

export const options = {
  chart: {
    title: "Historico consumo de Pipelines",
  },
};

export function HistoryConsumedPipelineChart() {
  return (
    <Chart
      chartType="Line"
      width="100%"
      height="95%"
      data={data}
      options={options}
    />
  );
}