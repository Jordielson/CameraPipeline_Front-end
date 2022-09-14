import axios from "axios";

const Api = () => {
    const token = localStorage.getItem("token");
    return axios.create({ 
        baseURL: "http://localhost:8080",
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
}
const ApiVideoStream = axios.create({ 
    baseURL: "http://localhost:3333/camera-pipeline",
});

export default Api;
export { ApiVideoStream }
