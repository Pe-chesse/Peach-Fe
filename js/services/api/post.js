import { Dio } from "../../utils/dio.js";
import { baseURL } from "../api.js";

export default class PostAPI {
  constructor() {
    this.dio = new Dio();
  }

  async list() {
    try {
      return await this.dio.get(baseURL.post.home);
    } catch (error) {
      return error;
    }
  }

  async write(body) {
    try {
      return await this.dio.post(baseURL.post.home, body);
    } catch (error) {
      return error;
    }
  }

  async like(postId) {
    try {
      return await this.dio.post(baseURL.post.like, { post: postId });
    } catch (error) {
      return error;
    }
  }

  async detail(postId) {
    try {
      return await this.dio.get(`${baseURL.post.home}${postId}/`);
    } catch (error) {
      return error;
    }
  }

  async edit(postId, body) {
    try {
      return await this.dio.put(`${baseURL.post.home}${postId}/`, body);
    } catch (error) {
      return error;
    }
  }

  async delete(postId) {
    try {
      return await this.dio.delete(`${baseURL.post.home}${postId}/`);
    } catch (error) {
      return error;
    }
  }
}
