import { address } from "./api";
import { firebaseUserInfo } from "../providers/oauth.js";
export function getUser() {
  console.log(firebaseUserInfo);
}
// const webSocket = new WebSocket(`ws://${address}/ws/v1/chat/${auth.}`);
// webSocket.onopen = (event) => {
//     console.log("WebSocket connection opened");
// };

// webSocket.onmessage = (event) => {
//     const message = event.data;
//     messagesElement.innerHTML += `<p>${message}</p>`;
// };

// webSocket.onclose = (event) => {
//     if (event.wasClean) {
//         console.log(`Closed cleanly, code=${event.code}, reason=${event.reason}`);
//     } else {
//         console.error("Connection died");
//     }
// };

// webSocket.onerror = (error) => {
//     console.error(`WebSocket Error: ${error.message}`);
// };

// sendButton.addEventListener("click", () => {
//     const message = messageInput.value;
//     webSocket.send(message);
//     messageInput.value = "";
// });
