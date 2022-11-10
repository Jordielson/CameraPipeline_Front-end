import Api from "../config/server/config";

const PipelineService = {
  register: async (params) => {
    var data = null;
    await Api()
      .post("/api/pipeline/register", params)
      .then((response) => {
        data = response.data;
      });

    return data;
  },
  update: async (params) => {
    var data = null;
    await Api()
      .put(`/api/pipeline/${params.id}`, params)
      .then((response) => {
        data = response.data;
      });

    return data;
  },
  preview: async (params) => {
    var data = null;
    await Api()
      .post("/api/pipeline/preview/" + params)
      .then((response) => {
        data = response.data;
      });
    return data;
  },
  getAll: async (params) => {
    var data = null;
    await Api()
      .get("/api/pipeline/all", {params})
      .then((response) => {
        data = response.data;
      });
    return data;
  },
  verifyLoop: async (params) => {
    var data = null;
    await Api()
      .get("/api/pipeline/verify-addition", {params})
      .then((response) => {
        data = response.data;
      });
    return data;
  },
  deletePipeline: async (id) => {
    var data = null;
    await Api()
      .delete("/api/pipeline/" + id)
      .then((response) => {
        data = response.data;
      });
    return data;
  },
  switchActive: async (params) => {
    var data = null;
    await Api()
      .patch(`/api/pipeline/` + params.id + `/state`,  null, {
        params: params
      })
      .then((response) => {
        data = response.data;
      });
    return data;
  },
  search: async (params) => {
    var data = null;
    await Api()
      .get("/api/pipeline", { params: params })
      .then((response) => {
        data = response.data;
      });
    return data;
  },
};

export default PipelineService;
