import axios from "axios";

const Api = axios.create({ 
    baseURL: "http://localhost:8080",
});
const ApiVideoStream = axios.create({ 
    baseURL: "http://localhost:3333",
});

export default Api;
export { ApiVideoStream }
