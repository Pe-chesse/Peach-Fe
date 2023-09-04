import timeAgo from "../utils/timeago.js";
import User from "./user.js";

export class Member {
  constructor(json) {
    this.email = json.user_email;
    this.nickname = json.user_nickname;
    this.image_url = json.user_image_url;
    this.last_read_num = json.last_read_num;
  }

  copyWith(newData) {
    return new Member({
      user_email: newData.email ?? this.email,
      user_nickname: newData.nickname ?? this.nickname,
      user_image_url: newData.image_url ?? this.image_url,
      last_read_num: newData.last_read_num ?? this.last_read_num,
    });
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
  copyWith(newData) {
    return new Message({
      num: newData.num ?? this.num,
      chat_room: newData.chat_room ?? this.chat_room,
      content: newData.content ?? this.content,
      user: newData.user ?? this.user,
      time: newData.time ?? this.time,
    });
  }
}

export class Chatroom {
  constructor(json) {
    this.name = json.name;
    this.members = json.members.map((e) => new Member(e));
    this.messages = json.messages.map((e) => new Message(e));
  }
  copyWith(newData) {
    return new Chatroom({
      name: newData.name ?? this.name,
      members: newData.members ?? this.members,
      messages: newData.messages ?? this.messages,
    });
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
  copyWith(newData) {
    return new RoomInfo({
      chat_room: newData.roomname ?? this.roomname,
      members: newData.members ?? this.members,
      last_read: newData.last_read ?? this.last_read,
      unread: newData.unread ?? this.unread,
      content: newData.content ?? this.content,
    });
  }
}

export class ChatInfo {
  constructor(data) {
    this.data = data.data.map((item) => new RoomInfo(item));
    this.unread = data.data
      .map((e) => e.unread)
      .reduce((previousValue, element) => previousValue + element, 0);
  }
  copyWith(newData) {
    return new ChatInfo({
      data: newData.data ?? this.data,
      un: newData.unread ?? this.unread,
    });
  }
}
