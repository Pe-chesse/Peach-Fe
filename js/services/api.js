import { AccountAPI } from "./api/account.js";
import { BucketAPI } from "./api/bucket.js";
import { ChatAPI } from "./api/chat.js";
import { PostAPI } from "./api/post.js";
import { CommentAPI } from "./api/comment.js";

const base = "http://3.37.239.49/api/v1/";
export const baseURL = {
  base: base,
  account: {
    verify: base + "account/verify/",
    profile: base + "account/profile/",
    follow: base + "account/follow/",
    search: base + "account/search/",
  },
  bucket: {
    media: base + "bucket/media/",
  },
  chat: {
    create: base + "chat/create/",
  },
  post: {
    home: base + "post/",
    like: base + "post/like/",
    comment: base + "post/comment/",
  },
};

export class API {
  constructor() {
    this.account = new AccountAPI();
    this.bucket = new BucketAPI();
    this.chat = new ChatAPI();
    this.post = new PostAPI();
    this.comment = new CommentAPI();
  }
}
