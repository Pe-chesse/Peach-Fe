export default class User {
  constructor(json) {
    this.email = json.email;
    this.nickname = json.nickname;
    this.image_url = json.image_url;
    this.description = json.description;
    this.followings = json.followings_length;
    this.followers = json.followers_length;
  }
}
