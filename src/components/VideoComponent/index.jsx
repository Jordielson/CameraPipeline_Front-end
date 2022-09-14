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
      fetchStream(props.url);
    }
  }, [props.url]);

  return (
    <div id="bodyc">
      {showVideo === StreamStatus.SUCCESS ? (
        <div>
          <div id="video-canvas" style={{ width: "319px", height: "240px" }} />
        </div>
      ) : showVideo === StreamStatus.LOADING ? (
        <div>
          <div id="video-canvas"></div>
          <div
            id="bodyc"
            className=""
            style={{ width: "100%", height: "240px" }}
          >
            <img src={load} alt="loading..." width={"100%"} height={"120px"} />
          </div>
        </div>
      ) : showVideo === StreamStatus.EMPTY ? (
        <div className="" style={{ width: "100%", height: "240px" }}></div>
      ) : (
        <label htmlFor="">NULL</label>
      )}
    </div>
  );
}

export default VideoStream;
