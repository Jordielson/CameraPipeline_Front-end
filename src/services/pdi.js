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
  verifyName: async (params) => {
    var data = null;
    await Api()
      .get("/api/model-pdi/verify-name", { params: params })
      .then((response) => {
        data = response.data;
      });
    return data;
  },
  verifyUrl: async (params) => {
    var data = null;
    await Api()
      .get("/api/model-pdi/verify-url", { params: params })
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
  search: async (params) => {
    var data = null;
    await Api()
      .get("/api/model-pdi", { params: params })
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
  update: async (params, id) => {
    var data = null;
    await Api()
      .put(`/api/model-pdi/${id}`, params)
      .then((response) => {
        data = response.status;
        console.log(response);
      });

    return data;
  },
  verifyUsed: async (params) => {
    var data = null;
    await Api()
      .get("/api/model-pdi/verify-used", { params: params })
      .then((response) => {
        data = response.data;
      });
    return data;
  },
};

export default PDIService;
