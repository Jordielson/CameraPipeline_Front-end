import Api from "../config/server/config";

const PDIService = {
  register: async (params) => {
    var data = null;
    await Api()
      .post("/api/model-pdi/register", params)
      .then((response) => {
        data = response.data;
      });

    return data;
  },
  getAll: async () => {
    var data = null;
    await Api()
      .get("/api/model-pdi/all")
      .then((response) => {
        data = response.data;
      });
    return data;
  },
  delete: async (params) => {
    var data = null;
    await Api()
      .delete(`/api/model-pdi/${params}`)
      .then((response) => {
        data = response.status;
        console.log(response);
      });

    return data;
  },
};

export default PDIService;
