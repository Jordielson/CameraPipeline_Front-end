import Api from "../config/server/config";

const UserService = {
  login: async (params) => {
    const response = await Api().post("/api/login", params);
    const data = response.data;
    localStorage.setItem("login", data.login);
    localStorage.setItem("token", data.token);
    return data;
  },
  register: (params) => {
    Api.post("/users/register", params);
  },
  logout: () => {
    localStorage.removeItem("login", null);
    localStorage.removeItem("token", null);
  },
};

export default UserService;
