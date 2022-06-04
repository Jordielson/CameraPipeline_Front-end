import Api from "./api.js";

const UserService = {
  login: async (params) => {
    const response = await Api.post(
      "/api/user/login", 
      params,
    );
    const data = response.data;
    localStorage.setItem("login", data.login);
    localStorage.setItem("token", data.token);
    return data;
  },
};

export default UserService;
