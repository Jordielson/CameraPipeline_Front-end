import {ApiVideoStream} from "../config/server/config";

const VideoStreamService = {
  createStream: async (params) => {
    const response = await ApiVideoStream.post(
      "/stream", 
      params,
    );
    const data = response.data;
    return data;
  },
  stopStream: async (params) => {
    const response = await ApiVideoStream.delete(
      `/stream/${params.id}`, 
      params,
    );
    const data = response.data;
    return data;
  },
};

export default VideoStreamService;