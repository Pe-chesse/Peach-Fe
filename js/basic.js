import oAuth from "./providers/oauth.js";
import { userInfo } from "./providers/oauth.js";
import { Chatroom, ChatInfo, Message } from "./models/chat.js";
import { onPageStateChange } from "./chat_list.js";
import WS from "./services/ws.js";
import { onRoomPageStateChange, onRoomPageStateadd } from "./message.js";

export let chatInfoState;

export let chatRoomState;
export let ws;
async function basic() {
  await oAuth();
  if (userInfo) {
    ws = new WS();
    const urlParams = new URLSearchParams(window.location.search);
    const path = window.location.pathname.split("/");
    const currentPath = path[path.length - 1];

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
      console.log(socketData);
      switch (socketData.type) {
        case "sync.message":
          chatInfoState = new ChatInfo(socketData);
          if (currentPath == "chat_list.html") {
            onPageStateChange(chatInfoState);
          }
          break;
        case "chat_room.info":
          chatRoomState = new Chatroom(socketData);
          if (currentPath == "chat_room.html") {
            onRoomPageStateChange(chatRoomState);
            window.scrollTo(0, document.body.scrollHeight);
          }
          break;
        case "chat.message":
          chatRoomState = chatRoomState.copyWith({
            messages: [...chatRoomState.messages, new Message(socketData)],
          });
          if (currentPath == "chat_room.html") {
            console.log(socketData);
            const newMessage = new Message(socketData);
            console.log(newMessage);
            onRoomPageStateadd(newMessage);
            window.scrollTo(0, document.body.scrollHeight);
          }
          break;
        default:
          return;
      }
    };
    try {
      document
        .querySelector(".tab-menu-profile a")
        .setAttribute(
          "href",
          `./my_profile.html?nickname=${userInfo.nickname}`
        );
    } catch (e) {
      console.log(e);
    }
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

