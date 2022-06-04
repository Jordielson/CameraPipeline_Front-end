import Api from "./api.js";

const UserService = {
  login: async (params) => {
    const response = Api.post("/api/user/login", params);
    localStorage.setItem("login", JSON.stringify(response.data.login));
    localStorage.setItem("token", response.data.token);
  },
};

export default UserService;
