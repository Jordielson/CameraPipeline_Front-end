import Api from "../config/server/config";

const ValueParameterService = {
  upload: async (params) => {
    var data = null;
    await Api()
      .post("/api/value/storage/upload-file", params)
      .then((response) => {
        data = response.data;
      });

    return data;
  }
};

export default ValueParameterService;