import axios from "axios";

const Api = () => {
    // const token = localStorage.getItem("token");
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2FvQGdtYWlsLmNvbSIsInNjb3BlcyI6IlJPTEVfVVNFUiIsImlhdCI6MTY2MjkyMzU0OSwiZXhwIjoxNjY0MTIzNTQ5fQ.NGoBjVtnURZx_P0t-istEJEHXDetbRZbrVYPqnaIeOU";
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
