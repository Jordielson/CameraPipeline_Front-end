import Api from "../config/server/config";

const VideoService = {
  upload: async (params) => {
    var data = null;
    await Api()
      .post("/api/video/storage/upload", params)
      .then((response) => {
        data = response.data;
      });

    return data;
  },
  generateVideo: async (params) => {
    var data = null;
    await Api()
      .post("/api/pipeline/generateVideo/" + params)
      .then((response) => {
        data = response.data;
      });
    return data;
  },
};

export default VideoService;
