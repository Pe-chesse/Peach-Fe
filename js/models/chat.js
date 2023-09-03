import timeAgo from "../utils/timeago.js";
import User from "./user.js";

export class Member {
  constructor(json) {
    this.email = json.user_email;
    this.nickname = json.user_nickname;
    this.image_url = json.user_image_url;
    this.last_read_num = json.last_read_num;
  }
}

export class Message {
  constructor(json) {
    this.num = json.num;
    this.chat_room = json.chat_room;
    this.content = json.content;
    this.user = new User(json.user);
    this.time = timeAgo(json.time);
  }
}

export class Chatroom {
  constructor(json) {
    this.name = json.name;
    this.members = json.members.map((e) => new Member(e));
    this.messages = json.messages.map((e) => new Message(e));
  }
}

export class RoomInfo {
  constructor(json) {
    function getUnread() {
      try {
        return json.last_message.num - json.last_read;
      } catch (e) {
        return 0;
      }
    }
    function getContent() {
      try {
        return json.last_message.content;
      } catch (e) {
        return "";
      }
    }
    this.roomname = json.chat_room;
    this.members = json.members.map((e) => new Member(e));
    this.last_read = json.last_read;
    this.unread = getUnread();
    this.content = getContent();
  }
}

export class ChatInfo {
  constructor(data) {
    this.data = data.map((item) => new RoomInfo(item.name, item.lastMessage));
    this.unread = data.map((e) => e.un);
  }
}
