import React, { useEffect } from "react";
import JSMpeg from "@cycjimmy/jsmpeg-player";

const ffmpegIP = "localhost";

function CameraVideo() {
    useEffect(() => {
        var videoUrl = `ws://${ffmpegIP}:7000/`;
        new JSMpeg.VideoElement("#video-canvas", videoUrl, {
          autoplay: true,
        });
    });
    return (
        <>
            <div id="video-canvas" style={{ height: "160px", width: "280px" }}></div>
        </>
    );
    
}

export default CameraVideo;