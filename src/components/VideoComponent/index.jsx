import React, { useEffect, useState } from "react";
import Styles from "./styles.module.css";
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
  const [player, setPlayer] = useState();

  const stopStream = async () => {
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
  };

  useEffect(() => {
    if (!props.show) {
      stopStream();
      player.destroy();
    }
  }, [props.show]);

  const fetchStream = async (stream) => {
    setShowVideo(StreamStatus.LOADING);

    try {
      let resp = await VideoStreamService.createStream({
        url: stream,
      });
      setResponse(resp);
      let canvas = document.getElementById("video-wrapper");
      var videoUrl = `ws://${ffmpegIP}:${resp.port}/`;

      new JSMpeg.Player(videoUrl, {
        canvas: canvas,
        audio: false,
        onPlay: setPlayer,
        onVideoDecode: videoDecode,
      });
    } catch (error) {
      alert(error);
      setShowVideo(StreamStatus.ERROR);
    }
  };

  const videoDecode = (decoder, time) => {
    setShowVideo(StreamStatus.SUCCESS);
  };

  useEffect(() => {
    if (player) {
      stopStream();
    }
    if (props.url !== "") {
      setStream(props.url);
      fetchStream(props.url);
    }
  }, [props.url]);

  return (
    <div className={Styles.container} style={{ width: props.width }}>
      <canvas id="video-wrapper" className={Styles.child} />
      {showVideo === StreamStatus.LOADING ? (
        <img
          src={load}
          alt="loading..."
          width={"120px"}
          height={"120px"}
          className={Styles.loading}
        />
      ) : null}
    </div>
  );
}

export default VideoStream;
