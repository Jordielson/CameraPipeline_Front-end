import { color, rgbToHex } from "@mui/system";
import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";



export function ConsumedAPIAreaChart() {
    const [data, setData] = useState(0);
    const [options, setOptions] = useState(0);


    function getRandomNumber(max = 100, min = 0) {
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

        const rand = getRandomNumber(11, 0);


        setOptions({
            title: date[rand],
            titleTextStyle: {
                color: "#757575",
                fontName: "Roboto",
                fontSize: 16,
                bold: false,
                italic: false,
            },
            legend: { position: 'top', alignment: "end" },
            vAxis: {
                title: "Capacidade de Processamento em %",
                minValue: 0,
                ticks: [0, 25, 50, 75, 100],
            },
            hAxis: {maxTextLines: 1},
            chartArea: {left:90,top:60,width:'95%',height:'60%'}

        })

    }

    function getRandomData() {

        const DataConsumed = [["", "Consumo API"]]

        var max = 10;
        var min = 0;

        for (var i = 0; i < 30; i++) {

            if (i < 9) {
                DataConsumed.push([`dia 0${i + 1}`, getRandomNumber(max, min)])
            } else {
                DataConsumed.push([`dia ${i + 1}`, getRandomNumber(max, min)])
            }
            var setMax = (getRandomNumber(1, 0) === 0 ? max + 15 > 100 ? max - 10 : max + 15 : max - 10 < 0 ? max + 15 : max - 10)
            max = setMax
            min = setMax / 1.5
            console.log(max, min)
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
            chartType="AreaChart"
            width="98%"
            height="98%"
            data={data}
            options={options}
        />
    );
}

