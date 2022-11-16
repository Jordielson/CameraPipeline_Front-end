import React from "react";
import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";


export function ConsumedAPILineChart() {
    const [data, setData] = useState(0);
    const [options, setOptions] = useState(0);
  

    function getRandomNumber(max=100, min=0) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomMonth() {
      const date = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ];

      const rand =  getRandomNumber(11, 0);
 
      setOptions({
        chart: {
          title: "Historico de Consumo Total",
          subtitle: date[rand],
        }
    })

    }

    function getRandomData() {

      const DataConsumed = [["", "Consumo API"]]

      for(var i = 0 ; i<30; i++){
        if(i<10){
          DataConsumed.push([`dia 0${i+1}`, getRandomNumber()])
        }else{
          DataConsumed.push([`dia ${i+1}`, getRandomNumber()])
        }
      }

      setData(DataConsumed);

    }
  
    useEffect(() => {
        getRandomData();
        getRandomMonth();

      const interval = setInterval(() => {
        getRandomData();
        getRandomMonth();
      }, 10000);
      return () => {
        clearInterval(interval);
      };
    }, []);
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