import React, { useEffect } from "react";
import { useState } from "react";
import "./styles.css";

export function InternetChart() {
  const [download, setDownload] = useState(0);
  const [upload, setUpload] = useState(0);
  const [ping, setPing] = useState(0);

  function getRandomNumber() {
    setDownload((Math.random() * 100).toFixed(1));
    setUpload((Math.random() * 100).toFixed(1));
    setPing((Math.random() * 100).toFixed(0));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setDownload((Math.random() * 100).toFixed(1));
      setUpload((Math.random() * 100).toFixed(1));
      setPing((Math.random() * 100).toFixed(0));
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="d-flex flex-column dbinternet">
      <h4>
        Download: <span className="dbinternetcolor">{download}mb</span>
      </h4>
      <h4>
        Upload: <span className="dbinternetcolor">{upload}mb</span>
      </h4>
      <h4>
        Latência: <span className="dbinternetcolor">{ping}ms</span>
      </h4>
    </div>
  );
}
