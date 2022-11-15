import React from "react";
import { ProgressBar } from "../../../shared/Utils";
import "./styles.css";

export function CurrentUsageChart() {
  const data = [
    { bgcolor: "#6a1b9a", completed: 40, text: "Processos Usados: ", current: "16/200" },
    { bgcolor: "#00695c", completed: 30, text: "Pipelines Usadas: ", current: "20/100" },
    { bgcolor: "#ef6c00", completed: 53, text: "Memória Usada: ", current: "20MB/10GB" },
  ];

  return (
    <div className="dbcurrentusage">
      {data.map((item, idx) => (
        <div className="infocurrentusagechart">
          <ProgressBar key={idx} bgcolor={item.bgcolor} completed={item.completed} />
          <p style={{fontSize:16}}>{item.text} 
            <span style={{fontSize:15, fontWeight:"500"}}>{item.current}</span>
          </p>
          
        </div>
      ))}
    </div>
  );
}
