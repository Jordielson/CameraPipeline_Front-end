import { Navigate, Outlet } from "react-router-dom";

const PublicRouter = () => {
  return localStorage.getItem("login") ? (
    <Navigate to={"/pipeline"} />
  ) : (
    <Outlet />
  );
};

export default PublicRouter;
