import Api from "../config/server/config"

const CameraService = {
    getAll: async () => {
        var data = null;
        await Api().get(
            "/api/camera/all"
        ).then((response) => {
            data = response.data;
        });
        return data;
    },
    search: async (params) => {
        var data = null;
        await Api().get(
            "/api/camera",
            {params: params}
        ).then((response) => {
            data = response.data;
        });
        return data;
    },
    register: async (params) => {
        var data = null;
        await Api()
            .post("/api/camera/register", params)
            .then((response) => {
                data = response.data;
            });
        return data;
    },
    update: async (params) => {
        var data = null;
        await Api()
            .put(`/api/camera/${params.id}`, params)
            .then((response) => {
                data = response.data;
            });
        return data;
    },
    delete: async (params) => {
        await Api()
            .delete(`/api/camera/${params.id}`);
    }
}

export default CameraService;