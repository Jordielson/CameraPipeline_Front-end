import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserService from "../services/user";

const PrivateRouter = () => {
  const [state, setState] = useState({
    loading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
      isAuthenticated()
    }, []);

  const isAuthenticated = async () => {
      const isAuth = await UserService.isAuthenticated();
      setState({
          loading: false,
          isAuthenticated: isAuth,
      });
  }

  return state.loading ? (<></>) : 
    state.isAuthenticated ? (
      <Outlet />
    ) : (
      <Navigate to={"/login"} />
    );
};

export default PrivateRouter;
