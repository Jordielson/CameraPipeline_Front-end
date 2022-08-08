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
    }
}

export default CameraService;