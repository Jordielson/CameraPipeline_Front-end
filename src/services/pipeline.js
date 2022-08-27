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
};

export default PipelineService;
