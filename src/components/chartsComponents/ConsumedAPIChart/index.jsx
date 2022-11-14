import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

function getRandomNumber() {
  return Math.random() * 100;
}

export function getData() {
  return [
    ["Label", "Value"],
    ["Memoria", getRandomNumber()],
    ["CPU", getRandomNumber()],
    ["Conexão", getRandomNumber()],
  ];
}

export const options = {
  redFrom: 90,
  redTo: 100,
  yellowFrom: 75,
  yellowTo: 90,
  minorTicks: 5,
};

export function ConsumedAPIChart() {
  const [data, setData] = useState(getData);

  useEffect(() => {
    const id = setInterval(() => {
      setData(getData());
    }, 3000);

    return () => {
      clearInterval(id);
    };
  });

  return (
    <Chart
      chartType="Gauge"
      width="100%"
      height="95%"
      data={data}
      options={options}
    />
  );
}