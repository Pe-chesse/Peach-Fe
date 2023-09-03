import oAuth from "./providers/oauth.js";
import { userInfo } from "./providers/oauth.js";
import { Chatroom, ChatInfo, Message } from "./models/chat.js";
import WS from "./services/ws.js";

export let chatInfoState;

export let chatRoomState;

async function basic() {
  await oAuth();
  if (userInfo) {
    const ws = new WS();
    const urlParams = new URLSearchParams(window.location.search);

    ws.onConnect = () => {
      if (urlParams.get("room")) {
        ws.send(
          JSON.stringify({
            type: "active_chat",
            request: {
              chat_room: urlParams.get("room"),
            },
          })
        );
      }
    };
    ws.onMessage = (message) => {
      const socketData = JSON.parse(message);
      switch (socketData.type) {
        case "sync.message":
          chatInfoState = new ChatInfo(socketData);
          break;
        case "chat_room.info":
          chatRoomState = new Chatroom(socketData);
          break;
        case "chat_message":
          chatRoomState = chatRoomState.copyWith({
            messages: [...chatRoomState.messages, new Message(socketData)],
          });
          break;
        default:
          console.log(socketData);
          return;
      }
    };
    document
      .querySelector(".tab-menu-profile a")
      .setAttribute("href", `./my_profile.html?nickname=${userInfo.nickname}`);
  }
  const tabMenuElements = document.querySelectorAll(".tab-menu-elements li");

  tabMenuElements.forEach((element) => {
    element.addEventListener("click", () => {
      console.log(element);
      tabMenuElements.forEach((otherElement) => {
        otherElement.classList.remove("on");
      });
      element.classList.add("on");
    });
  });
}
basic();

