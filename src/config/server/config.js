import axios from "axios";

const Api = (token = localStorage.getItem("token")) => {
  if (token) {
    return axios.create({
      baseURL: "http://localhost:8080",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    return axios.create({
      baseURL: "http://localhost:8080",
    });
  }
};
const ApiVideoStream = axios.create({
  baseURL: "http://localhost:3333",
});

const localURL = "http://localhost:3000/"

export default Api;
export { ApiVideoStream, localURL };
