import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "../pages/LoginScreen";
import PDIScreen from "../pages/PDIScreen";
import PipelineScreen from "../pages/PipelineScreen/PipelineScreen";
import VideoStreamScreen from "../pages/VideoStreamScreen";
import PrivateRouter from "./../components/PrivateRouter";

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginScreen />}></Route>
        <Route path="/stream" element={<VideoStreamScreen />}></Route>

        <Route element={<PrivateRouter />}>
          <Route path="/pipeline" element={<PipelineScreen />}></Route>
        </Route>
        <Route element={<PrivateRouter />}>
          <Route path="/pdi" element={<PDIScreen />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default MyRoutes;
