import { ws } from "./basic.js";

const urlParams = new URLSearchParams(window.location.search);

const chatRoomTitle = document.querySelector(".chat-room-title");
chatRoomTitle.innerHTML = urlParams.get("display");

const chatMessageInput = document.querySelector(".message-send");
const chatSendButton = document.querySelector(".send-button");

chatSendButton.addEventListener("click", () => {
  ws.send(
    JSON.stringify({
      type: "send_chat",
      request: {
        chat_room: urlParams.get("room"),
      },
      content: chatMessageInput.value,
    })
  );
  chatMessageInput.value = "";
});
