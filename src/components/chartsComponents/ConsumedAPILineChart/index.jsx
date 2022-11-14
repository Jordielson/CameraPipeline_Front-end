import React from "react";
import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";


export function ConsumedAPILineChart() {
    const [data, setData] = useState(0);
    const [options, setOptions] = useState(0);
  

    function teste(){
        // Calma, vou por um random melhor aqui 
    }

    function getRandomData() {
      setData([
        ["Year", "Consumo API"],
        ["dia 1", (Math.random() * 100 + 1)],
        ["dia 6", (Math.random() * 100 + 1)],
        ["dia 12", (Math.random() * 100 + 1)],
        ["dia 18", (Math.random() * 100 + 1)],
        ["dia 24", (Math.random() * 100 + 1)],
        ["dia 30", (Math.random() * 100 + 1)]]);

    }
  
    useEffect(() => {
        getRandomData();

        setOptions({
                title: "Novembro",
                curveType: "function",
                legend: { position: "bottom" },
              })

      const interval = setInterval(() => {
        getRandomData();
      }, 3000);
      return () => {
        clearInterval(interval);
      };
    }, []);
  return (
    <Chart
      chartType="LineChart"
      width="95%"
      height="95%"
      data={data}
      options={options}
    />
  );
}