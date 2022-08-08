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
  const [showVideo, setShowVideo] = useState(StreamStatus.EMPTY);

  const fetchStream = async (stream) => {

    setShowVideo(StreamStatus.LOADING);

    try {
      await VideoStreamService.stopStream({
        url: stream1,
        id: 1
      });
    } catch (error) {
      console.log(error);
    }

    try {
      await VideoStreamService.createStream({
        url: stream,
      });
      var videoUrl = `ws://${ffmpegIP}:7000/`;
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
    if(props.url !== ''){
      setStream(props.url)
      fetchStream(props.url);
    }
  }, [props.url]);
  
  return (
    <div id="bodyc">
      {showVideo === StreamStatus.SUCCESS ? (
        <div>
          <div id="video-canvas" style={{ width: "340px", height: "240px" }} />
        </div>
      ) : showVideo === StreamStatus.LOADING ? (
        <div>
          <div id="video-canvas"></div>
          <div
            id="bodyc"
            className="border-video"
            style={{ width: "340px", height: "240px" }}
          >
            <img src={load} alt="loading..." width={"120px"} height={"120px"} />
          </div>
        </div>
      ) : showVideo === StreamStatus.EMPTY ? (
        <div
          className="border-video"
          style={{ width: "340px", height: "240px" }}
        ></div>
      ) : (
        <label htmlFor="">NULL</label>
      )}
    </div>
  );
}

export default VideoStream;
