import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "../pages/LoginScreen";
import PipelineScreen from "../pages/PipelineScreen/PipelineScreen";
import VideoStreamScreen from "../pages/VideoStreamScreen";

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />}></Route>
        <Route path="/stream" element={<VideoStreamScreen />}></Route>
        <Route path="/pipeline" element={<PipelineScreen />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default MyRoutes;
