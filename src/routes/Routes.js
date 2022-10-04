import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import CameraScreen from "../pages/CameraScreen/CameraScreen";
import LoginScreen from "../pages/LoginScreen";
import PDIScreen from "../pages/PDIScreen";
import PipelineScreen from "../pages/PipelineScreen/PipelineScreen";
import VideoStreamScreen from "../pages/VideoStreamScreen";
import ChangePassword from "../pages/ChangePasswordScreen";
import NewUser from "../pages/NewUserScreen";
import Guide from "../pages/Guide";
import PrivateRouter from "./../components/PrivateRouter";
import PublicRouter from "./../components/PublicRouter";
import UserGuideScreen from "./../pages/Guide/UserGuide/index";
import ForgottenPassword from "../pages/ForgottenPassword";
import PasswordReset from "../pages/PasswordReset";
import EditImageScreen from "../pages/EditImageScreen";
import EditVideoScreen from "../pages/EditVideoScreen";
import FlowScreen from "../pages/FlowScreen";

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RedirectDefault />} />

        <Route element={<PublicRouter />}>
          <Route path="/login" element={<LoginScreen />}></Route>
        </Route>
        <Route element={<PublicRouter />}>
          <Route path="/criar-conta" element={<NewUser />}></Route>
        </Route>
        <Route element={<PublicRouter />}>
          <Route path="/guia" element={<Guide />}></Route>
        </Route>
        <Route element={<PrivateRouter />}>
          <Route path="/user-guide" element={<UserGuideScreen />}></Route>
        </Route>
        <Route element={<PrivateRouter />}>
          <Route path="/editar-imagem" element={<EditImageScreen />}></Route>
        </Route>
        <Route element={<PrivateRouter />}>
          <Route path="/editar-video" element={<EditVideoScreen />}></Route>
        </Route>
        <Route element={<PrivateRouter />}>
          <Route path="/flow" element={<FlowScreen />}></Route>
        </Route>

        <Route path="/stream" element={<VideoStreamScreen />}></Route>

        <Route element={<PrivateRouter />}>
          <Route path="/pipeline" element={<PipelineScreen />}></Route>
        </Route>
        <Route element={<PrivateRouter />}>
          <Route path="/pdi" element={<PDIScreen />}></Route>
        </Route>
        <Route element={<PrivateRouter />}>
          <Route path="/camera" element={<CameraScreen />}></Route>
        </Route>
        <Route element={<PrivateRouter />}>
          <Route path="/alterar-senha" element={<ChangePassword />}></Route>
        </Route>
        <Route element={<PublicRouter />}>
          <Route
            path="/forgotten-password"
            element={<ForgottenPassword />}
          ></Route>
        </Route>
        <Route element={<PublicRouter />}>
          <Route
            path="/password-reset/:resetString"
            element={<PasswordReset />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function RedirectDefault() {
  return <Navigate to="/login" replace />;
}

export default MyRoutes;
