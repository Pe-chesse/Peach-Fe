import timeAgo from "./utils/timeago.js";
const user = JSON.parse(sessionStorage.personalInfo);

const chatRoomBody = document.querySelector(".chat-room");
function userMessage(message) {
  const messagebody = document.createElement("div");
  messagebody.classList.add("chat-room-they");

  const image = document.createElement("img");
  image.classList.add("post-userinfo-img");
  image.src = message.user.image_url ?? "../img/peach-user.png";
  image.alt = "user-profile";

  const h3 = document.createElement("h3");
  h3.textContent = message.content;

  const p = document.createElement("p");
  p.classList.add("chat-message-time");
  p.textContent = message.time;

  messagebody.appendChild(image);
  messagebody.appendChild(h3);
  messagebody.appendChild(p);
  return messagebody;
}

function myMessage(message) {
  const messagebody = document.createElement("div");
  messagebody.classList.add("chat-room-my");

  const p = document.createElement("p");
  p.classList.add("chat-message-time");
  p.textContent = message.time;

  const h3 = document.createElement("h3");
  h3.textContent = message.content;
  messagebody.appendChild(p);
  messagebody.appendChild(h3);
  return messagebody;
}

export function onRoomPageStateChange(chatRoomInfo) {
  chatRoomBody.innerHTML = "";
  chatRoomInfo.messages.forEach((element) => {
    const chatroom =
      element.user.nickname == user.nickname
        ? myMessage(element)
        : userMessage(element);
    chatRoomBody.appendChild(chatroom);
  });
}

export function onRoomPageStateadd(message) {
  console.log(message);
  const messageBody =
    message.user.nickname == user.nickname
      ? myMessage(message)
      : userMessage(message);
  chatRoomBody.appendChild(messageBody);
}
