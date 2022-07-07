import VideoStream from "../components/VideoStream";
import LogoTitle from "../components/fragment/LogoTitle";
import "bootstrap/dist/css/bootstrap.min.css";

function VideoStreamScreen() {
    return (
        <div className="App">
            <LogoTitle />
            <VideoStream />
        </div>
    );
}

export default VideoStreamScreen;