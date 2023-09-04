import { address } from "./api.js";

export default class WS {
  constructor() {
    const user = JSON.parse(sessionStorage.user);
    this.url = `ws://${address}:8001/ws/v1/chat/${user.uid}/`;
    this.socket = null;
    this.connect();
  }

  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      this.onConnect();
    };

    this.socket.onmessage = (event) => {
      this.onMessage(event.data);
    };

    this.socket.onclose = () => {
      this.onDisconnect();
    };
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }

  send(message) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    }
  }

  onConnect() {
    console.log("WebSocket connected");
  }

  onDisconnect() {
    console.log("WebSocket disconnected");
  }

  onMessage(message) {}
}
