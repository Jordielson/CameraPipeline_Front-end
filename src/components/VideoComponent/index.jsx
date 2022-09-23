import React, { useEffect, useState } from "react";
import "./styles.css";
import JSMpeg from "@cycjimmy/jsmpeg-player";
import VideoStreamService from "../../services/video_stream";
import load from "../../assets/load.gif";

const ffmpegIP = "localhost";

const StreamStatus = {
  LOADING: "loading",
  SUCCESS: "success",
  EMPTY: "empty",
  ERROR: "error",
};

function VideoStream(props) {
  const [stream1, setStream] = useState(props.url);
  const [response, setResponse] = useState();
  const [showVideo, setShowVideo] = useState(StreamStatus.EMPTY);

  const fetchStream = async (stream) => {
    setShowVideo(StreamStatus.LOADING);

    try {
      if (response !== undefined) {
        await VideoStreamService.stopStream({
          url: response.url,
          id: response.id,
        });
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let resp = await VideoStreamService.createStream({
        url: stream,
      });
      setResponse(resp);
      var videoUrl = `ws://${ffmpegIP}:${resp.port}/`;
      new JSMpeg.VideoElement("#video-canvas", videoUrl, {
        autoplay: true,
      });
      setTimeout(() => {
        setShowVideo(StreamStatus.SUCCESS);
      }, 7000);
    } catch (error) {
      alert(error);
      setShowVideo(StreamStatus.ERROR);
    }
  };

  useEffect(() => {
    if (props.url !== "") {
      setStream(props.url);
      // fetchStream(props.url);
      setShowVideo(StreamStatus.LOADING)
    }
  }, [props.url]);

  return (
    <div id="container">
      {showVideo === StreamStatus.SUCCESS ? (
        <div className="container" style={{ width: props.width }}>
          <div 
            id="video-canvas" 
            className="child" />
        </div>
      ) : showVideo === StreamStatus.LOADING ? (
        <div className="container" style={{ width: props.width }}>
          <div id="video-canvas" className="child"></div>
            <img 
              src={load} 
              alt="loading..." 
              width={"120px"} 
              height={"120px"} 
              className="loading"
            />
        </div>
      ) : showVideo === StreamStatus.EMPTY ? (
        <div className="container" style={{ width: props.width }}>
          <div className="child" ></div>
        </div>
      ) : (
        <div className="container" style={{ width: props.width }}>
          <div className="child" ></div>
        </div>
      )}
    </div>
  );
}

export default VideoStream;
