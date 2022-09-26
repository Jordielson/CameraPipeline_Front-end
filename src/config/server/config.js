import axios from "axios";

const Api = (token = localStorage.getItem("token")) => {
  const baseURL = "https://camera-pipeline-api.herokuapp.com";
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
  baseURL: "http://localhost:3333",
});

const localURL = "http://localhost:3000/"

export default Api;
export { ApiVideoStream, localURL };
