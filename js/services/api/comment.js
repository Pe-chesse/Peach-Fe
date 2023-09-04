import { Dio } from "../../utils/dio.js";
import { baseURL } from "../api.js";

export default class CommentAPI {
  constructor() {
    this.dio = new Dio();
  }

  async write(postId, body) {
    try {
      return await this.dio.post(`${baseURL.post.home}${postId}/`, {
        body: body,
      });
    } catch (error) {
      return error;
    }
  }
  async reply(commentId, body) {
    try {
      return await this.dio.post(`${baseURL.post.comment}${commentId}`, {
        body: body,
      });
    } catch (error) {
      return error;
    }
  }

  async edit(commentId, body) {
    try {
      return await this.dio.put(`${baseURL.post.comment}${commentId}`, {
        body: body,
      });
    } catch (error) {
      return error;
    }
  }

  async delete(commentId) {
    try {
      return await this.dio.delete(`${baseURL.post.comment}${commentId}/`);
    } catch (error) {
      return error;
    }
  }
}
