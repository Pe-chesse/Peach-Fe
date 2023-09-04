import { Dio } from "../../utils/dio.js";
import { baseURL } from "../api.js";

export default class BucketAPI {
  constructor() {
    this.dio = new Dio();
  }

  async media(files) {
    try {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`file${index}`, file);
      });

      const response = await this.dio.post(baseURL.bucket.media, formData);

      return response;
    } catch (error) {
      return error;
    }
  }
}
