import React, { useEffect, useState } from "react";
import "./styles.css";
import JSMpeg from "@cycjimmy/jsmpeg-player";
import VideoStreamService from "../../services/video_stream";

const ffmpegIP = "localhost";
// rtsp://rtsp.stream/pattern
function CameraVideo() {
    const [stream, setStream] = useState("");

    const fetchStream = async (e) => {
        try {
            console.log("OK>>");
            const response = await VideoStreamService.createStream({
                url: stream
            });
            var videoUrl = `ws://${ffmpegIP}:7000/`;
            new JSMpeg.VideoElement("#video-canvas", videoUrl, {
                autoplay: true,
            });
          alert(`Sucess!!! 
            \nResponse: ${response}`);
        } catch (error) {
          alert(error);
        }
      };
    useEffect(() => {
        fetchStream();
    }, [stream]);
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
            <input type="text" value={stream} onChange={(e) => setStream(e.target.value)}/>
            <div id="video-canvas" style={{ width: "640px", height: "480px"}}/>
        </div>
    );
    
}

export default CameraVideo;