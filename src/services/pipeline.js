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
  preview: async (params) => {
    var data = null;
    await Api()
      .post("/api/pipeline/preview/" + params)
      .then((response) => {
        data = response.data;
      });
    return data;
  },
  getAll: async () => {
    var data = null;
    await Api()
      .get("/api/pipeline/all")
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
};

export default PipelineService;
