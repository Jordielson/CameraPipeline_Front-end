import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  return localStorage.getItem("login") ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} />
  );
};

export default PrivateRouter;
