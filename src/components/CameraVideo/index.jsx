import React, { useEffect, useState } from "react";
import "./styles.css";
import JSMpeg from "@cycjimmy/jsmpeg-player";
import VideoStreamService from "../../services/video_stream";
import load from '../../assets/load.gif';

const ffmpegIP = "localhost";
// rtsp://rtsp.stream/pattern
const StreamStatus = {
    LOADING: "loading",
    SUCCESS: "success",
    EMPTY: "empty",
    ERROR: "error"
}
function VideoStream() {
    const [stream, setStream] = useState("rtsp://rtsp.stream/pattern");
    const [showVideo, setShowVideo] = useState(StreamStatus.EMPTY);

    const fetchStream = async (e) => {
        setShowVideo(StreamStatus.LOADING);
        try {
            await VideoStreamService.createStream({
                url: stream
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
        // fetchStream();
    }, []);
    return (
        <div id="body">
            <div
                id="title"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "28px",
                    fontWeight: "bold",
                    marginTop: "10px",
                    marginBottom: "10px",
                    color: "blue",
                }}
                >
                Teste Câmera Stream
            </div>
            <div style={{marginBottom: "15px"}}>
                <input type="text" value={stream} onChange={(e) => setStream(e.target.value)}/>
                <button onClick={fetchStream}>OK</button>
            </div>
            {showVideo === StreamStatus.SUCCESS ? (
                <div>
                    <div id="video-canvas" style={{ width: "640px", height: "480px"}}/>
                </div>
            ): showVideo === StreamStatus.LOADING ? (
                <div>
                    <div id="video-canvas"></div>
                    <img src={load} alt="loading..." width={"640px"} height={"480px"} />
                </div>
            ):  showVideo === StreamStatus.EMPTY ? (
                <div style={{borderStyle: "solid" ,borderColor: "cyan",width: "640px", height: "480px"}}>
                </div>
            ) : <label htmlFor="">NULL</label>
            }
        </div>
    );
    
}



export default VideoStream;