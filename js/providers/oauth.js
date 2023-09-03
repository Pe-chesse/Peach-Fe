import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { api } from "../services/api.js";
import User from "../models/user.js";

export let userInfo;

const allowPage = [
  "",
  "index.html",
  "loginpage.html",
  "join.html",
  "post_pk.html",
];

export default async function oAuth() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  return new Promise(async (resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      const currentEndpoint = window.location.pathname;
      const path = window.location.pathname.split("/");
      const currentPath = path[path.length - 1];
      console.log(currentPath);
      if (!user && allowPage.includes(currentEndpoint)) {
        // return (window.location.href = "/index.html");
      }
      window.sessionStorage.setItem("user", JSON.stringify(user));
      try {
        const response = await api.account.verify();
        userInfo = new User(response);
        resolve(userInfo);
        if (userInfo) {
          window.sessionStorage.setItem(
            "personalInfo",
            JSON.stringify(response)
          );
          // if (userInfo.nickname == null || userInfo.nickname == "") {
          //   window.location.href = "/html/profile.html";
          // } else {
          //   if (allowPage.includes(currentPath)) {
          //     window.location.href = "/html/homepage.html";
          //   }
          // }
        }
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  });
}
