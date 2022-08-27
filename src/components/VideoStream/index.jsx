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
function VideoStream() {
  const [stream, setStream] = useState("rtsp://rtsp.stream/pattern");
  const [showVideo, setShowVideo] = useState(StreamStatus.EMPTY);

  const fetchStream = async (e) => {
    setShowVideo(StreamStatus.LOADING);
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
  useEffect(() => {}, []);
  return (
    <div id="bodyc">
      <div class="input-group mb-3" style={{ width: "100%" }}>
        <input
          type="text"
          class="form-control"
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          value={stream}
          onChange={(e) => setStream(e.target.value)}
        />
        <button
          class="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          onClick={fetchStream}
        >
          Button
        </button>
      </div>
      {showVideo === StreamStatus.SUCCESS ? (
        <div>
          <div id="video-canvas" style={{ width: "100%", height: "240px" }} />
        </div>
      ) : showVideo === StreamStatus.LOADING ? (
        <div>
          <div id="video-canvas"></div>
          <div
            id="bodyc"
            className="border-video"
            style={{ width: "100%", height: "240px" }}
          >
            <img src={load} alt="loading..." width={"120px"} height={"120px"} />
          </div>
        </div>
      ) : showVideo === StreamStatus.EMPTY ? (
        <div
          className="border-video"
          style={{ width: "100%", height: "240px" }}
        ></div>
      ) : (
        <label htmlFor="">NULL</label>
      )}
    </div>
  );
}

export default VideoStream;
