const user = JSON.parse(sessionStorage.personalInfo);

function renderChatRoom(roomInfo) {
  function roomMember() {
    return roomInfo.members.filter((e) => e.nickname !== user.nickname);
  }
  const target = roomMember();
  console.log(target);
  const chatListContainer = document.createElement("div");
  chatListContainer.classList.add("chat-list-index");

  const img = document.createElement("img");
  img.setAttribute("src", target[0].image_url ?? "../img/peach-user.png");
  img.setAttribute("alt", "user-profile");
  img.classList.add("post-userinfo-img");

  const chatListContent = document.createElement("div");
  chatListContent.classList.add("chat-list-content");

  const h2 = document.createElement("h2");
  h2.textContent = target[0].nickname;

  const p = document.createElement("p");
  p.textContent = roomInfo.content;

  chatListContainer.appendChild(img);
  chatListContainer.appendChild(chatListContent);
  chatListContent.appendChild(h2);
  chatListContent.appendChild(p);
  if (roomInfo.unread > 0) {
    const chatListCheck = document.createElement("p");
    chatListCheck.classList.add("chat-list-check");
    chatListCheck.textContent = roomInfo.unread;

    chatListContainer.appendChild(chatListCheck);
  }

  chatListContainer.addEventListener(
    "click",
    () =>
      (window.location.href = `./chat_room.html?display=${target[0].nickname}&room=${roomInfo.roomname}`)
  );
  return chatListContainer;
}
const chatList = document.querySelector(".chat-list");
export function onPageStateChange(data) {
  console.log(data);
  chatList.innerHTML = "";
  data.data.forEach((element) => {
    console.log(element);
    const chatroom = renderChatRoom(element);
    chatList.appendChild(chatroom);
  });
}
