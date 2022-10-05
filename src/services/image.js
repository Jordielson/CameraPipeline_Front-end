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
  //   preview: async (params) => {
  //     var data = null;
  //     await Api()
  //       .post("/api/pipeline/preview/" + params)
  //       .then((response) => {
  //         data = response.data;
  //       });
  //     return data;
  //   },
};

export default ImageService;
