import Api from "../config/server/config";

const ImageService = {
  upload: async (params) => {
    var data = null;
    await Api()
      .post("/api/image/storage/upload", params)
      .then((response) => {
        data = response.data;
      });

    return data;
  },
  generateImage: async (params) => {
    var data = null;
    await Api()
      .post("/api/image/generateImage", params)
      .then((response) => {
        data = response.data;
      });
    return data;
  },
  getImage: async (params) => {
    var data = null;
    await Api()
      .get(`/api/image/storage/${params.id}`, params)
      .then((response) => {
        data = response.data;
      });
    return data;
  },
  delete: async (params) => {
    var data = null;
    await Api()
      .delete(`/api/image/${params}`)
      .then((response) => {
        data = response.data;
      });
    return data;
  },
};

export default ImageService;
