import Api from "../config/server/config";

const UserService = {

  login: async (params) => {
    const response = await Api().post("/api/login", params);
    const data = response.data;
    localStorage.setItem("login", data.login);
    localStorage.setItem("token", data.token);
    return data;
  },

  isAuthenticated: async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await Api().post("/api/isValidToken", {token});
      return response.data.valid;
    } catch (error) {
      return false;
    }
  },

  register: async (params) => {
    const response = await Api().post(`/api/user/register`, params);
    return response.data;
  },
  
  forgotPassword: async (params) => {
    const response = await Api().post(`/api/user/forgot-password`, params);
    return response.data;
  },
  
  passwordReset: async (params) => {
    const response = await Api(params.token).post(
      `/api/user/password-reset`, 
      null, 
      {
      params: params
      }
    );
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("login", null);
    localStorage.removeItem("token", null);
  },
  
  changePassword: async (params) => {
    const formattedParams = new URLSearchParams();
    formattedParams.append('oldpassword', params.oldpassword);
    formattedParams.append('newpassword', params.newpassword);

    const response = await Api().post(`/api/user/password`, formattedParams);
    return response.data;
  }
  
};

export default UserService;
