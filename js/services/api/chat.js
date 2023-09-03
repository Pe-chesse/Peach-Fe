import { Dio } from "../../utils/dio.js";
import { baseURL } from "../api.js";

export default class ChatAPI {
  constructor() {
    this.dio = new Dio();
  }

  async create(nickname) {
    try {
      return await this.dio.post(baseURL.chat.create, { nickname: nickname });
    } catch (error) {
      return error;
    }
  }
}
