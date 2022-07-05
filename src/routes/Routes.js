import { BrowserRouter, Route, Routes } from "react-router-dom";
import VideoStream from "../components/CameraVideo";
import LoginScreen from "../pages/LoginScreen";
import PipelineScreen from "../pages/PipelineScreen";
import "bootstrap/dist/css/bootstrap.min.css";

function MyRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginScreen/>}></Route>
                <Route path="/stream" element={<VideoStream/>}></Route>
                <Route path="/pipeline" element={<PipelineScreen/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default MyRoutes;