import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  [
    "Tempo",
    "Reconhecimento Placa",
    "Análise de Emoção Facial",
  ],
  [1, 1, 2.8],
  [2, 1.9, 2.5],
  [3, 2.4, 2.7],
  [4, 2.7, 3.8],
  [5, 2.9, 3.6],
  [6, 3.8, 3.6],
  [7, 3.6, 3.3],
  [8, 3.3, 3.2],
  [9, 3.9, 3.9],
  [10, 3.8, 3.9],
  [11, 4.3, 3.9],
  [12, 4.6, 3.4]
];

export const options = {
  chart: {
    title: "Processos consumidos por pipeline",
    subtitle: "Processos consumidos nas últimas 12 horas",
  },
};

export function ProcessByPipelineChart() {
    return (
      <Chart
        chartType="Line"
        width="95%"
        height="95%"
        data={data}
        options={options}
      />
    );
  }