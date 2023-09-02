import { getAuth } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

class Dio {
  async get(url, headers = {}) {
    const idToken = await this.getIdToken();
    return this.dio(url, "GET", undefined, {
      Authorization: `Bearer ${idToken}`,
      ...headers,
    });
  }

  async post(url, body = {}, headers = {}) {
    const idToken = await this.getIdToken();
    return this.dio(url, "POST", body, {
      Authorization: `Bearer ${idToken}`,
      ...headers,
    });
  }

  async put(url, body = {}, headers = {}) {
    const idToken = await this.getIdToken();
    return this.dio(url, "PUT", body, {
      Authorization: `Bearer ${idToken}`,
      ...headers,
    });
  }

  async delete(url, headers = {}) {
    const idToken = await this.getIdToken();
    return this.dio(url, "DELETE", undefined, {
      Authorization: `Bearer ${idToken}`,
      ...headers,
    });
  }

  async getIdToken() {
    try {
      const auth = getAuth();
      return await auth.currentUser.getIdToken();
    } catch (e) {
      return "";
    }
  }

  async dio(url, method, body, headers) {
    const mergedOptions = {
      method: method,
      body: body,
      headers: headers,
    };
    try {
      const response = await fetch(url, mergedOptions);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    } catch (e) {
      throw new Error("Network response was not ok");
    }
  }
}

export default Dio;
