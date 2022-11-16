import React from "react";
import { ProgressBar } from "../../../shared/Utils";
import "./styles.css";

export function PipelinesActive() {
  const data = [
    { bgcolor: "#008000", completed: 75, text: "Pipelines ativadas: ", current: "150/200" },
    { bgcolor: "#FF0000", completed: 25, text: "Pipelines desativadas: ", current: "50/200" },
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
