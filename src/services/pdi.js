import Api from "../config/server/config"

const PDIService = {
    getAll: async () => {
        var data = null;
        await Api().get(
            "/api/model-pdi/all"
        ).then((response) => {
            data = response.data;
        });
        return data;
    }
}

export default PDIService;