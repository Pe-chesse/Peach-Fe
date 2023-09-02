import { Dio } from "../../utils/dio.js";
import { baseURL } from "../api.js";

class AccountAPI {
  constructor() {
    this.dio = new Dio();
  }

  async verify() {
    try {
      return await this.dio.get(baseURL.account.verify);
    } catch (error) {
      return error;
    }
  }

  async getProfile(nickname) {
    try {
      return await this.dio.get(`${baseURL.account.profile}?user=${nickname}`);
    } catch (error) {
      return error;
    }
  }

  async editProfile(userInfo) {
    try {
      return await this.dio.put(baseURL.account.profile, userInfo);
    } catch (error) {
      return error;
    }
  }

  async getFollow(nickname, follow) {
    try {
      return await this.dio.get(
        `${baseURL.account.follow}${nickname}?f=${follow}`
      );
    } catch (error) {
      return error;
    }
  }

  async setFollow(nickname) {
    try {
      return await this.dio.post(`${baseURL.account.follow}${nickname}`);
    } catch (error) {
      return error;
    }
  }

  async search(nickname) {
    try {
      return await this.dio.post(`${baseURL.account.search}?user=${nickname}`);
    } catch (error) {
      return error;
    }
  }
}
