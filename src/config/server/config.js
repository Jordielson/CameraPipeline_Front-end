import axios from "axios";

const BASE_API_URL = process.env.REACT_APP_API_BASE_API_URL;
const BASE_VIDEO_STREAM_URL = process.env.REACT_APP_API_BASE_VIDEO_STREAM_URL;
const LOCAL_APP_URL = process.env.REACT_APP_API_BASE_APP_URL;

const Api = (token = localStorage.getItem("token")) => {
  if (token) {
    return axios.create({
      baseURL: BASE_API_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    return axios.create({
      baseURL: BASE_API_URL,
    });
  }
};
const ApiVideoStream = axios.create({
  baseURL: BASE_VIDEO_STREAM_URL,
});

export default Api;
export { ApiVideoStream, LOCAL_APP_URL };
