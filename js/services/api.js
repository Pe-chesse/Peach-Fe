import AccountAPI from "./api/account.js";
import BucketAPI from "./api/bucket.js";
import ChatAPI from "./api/chat.js";
import PostAPI from "./api/post.js";
import CommentAPI from "./api/comment.js";

export const address = "3.37.239.49";
const baseurl = `http://${address}/api/v1/`;
export const baseURL = {
  base: baseurl,
  account: {
    verify: baseurl + "account/verify/",
    profile: baseurl + "account/profile/",
    follow: baseurl + "account/follow/",
    search: baseurl + "account/search/",
  },
  bucket: {
    media: baseurl + "bucket/media/",
  },
  chat: {
    create: baseurl + "chat/create/",
  },
  post: {
    home: baseurl + "post/",
    like: baseurl + "post/like/",
    comment: baseurl + "post/comment/",
  },
};

class API {
  constructor() {
    this.account = new AccountAPI();
    this.bucket = new BucketAPI();
    this.chat = new ChatAPI();
    this.post = new PostAPI();
    this.comment = new CommentAPI();
  }
}
export const api = new API();
