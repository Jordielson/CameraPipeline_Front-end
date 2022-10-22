import Api from "../config/server/config";

const PipelineHistoryService = {
  getHistoric: async (id) => {
    var data = null;
    await Api()
      .get(`/api/pipeline-data-history/pipeline/${id}`)
      .then((response) => {
        data = response.data;
      });
    return data;
  },
  getVersion: async (version) => {
    var data = null;
    await Api()
      .get("/api/pipeline/all")
      .then((response) => {
        data = response.data;
      });
    return data;
  },
  restoreVersion: async (version) => {
    var data = null;
    await Api()
      .post(`/api/pipeline-data-history/restore/${version}`)
      .then((response) => {
        data = response.data;
      });
    return data;
  },
};

export default PipelineHistoryService;
