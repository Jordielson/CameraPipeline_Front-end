import axios from "axios";

const Api = (token = localStorage.getItem("token")) => {
  const baseURL = "http://localhost:8080";
  if (token) {
    return axios.create({
      baseURL: baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    return axios.create({
      baseURL: baseURL,
    });
  }
};
const ApiVideoStream = axios.create({
  baseURL: "http://localhost:3333/camera-pipeline",
});

const localURL = "http://localhost:3000/"

export default Api;
export { ApiVideoStream, localURL };
