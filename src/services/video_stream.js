import {ApiVideoStream} from "../config/server/config";

const VideoStreamService = {
  createStream: async (params) => {
    const response = await ApiVideoStream.post(
      "/usuario", 
      params,
    );
    const data = response.data;
    return data;
  },
};

export default VideoStreamService;