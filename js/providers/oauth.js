import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { api } from "../services/api.js";
import User from "../models/user.js";

const allowPage = [
  "index.html",
  "loginpage.html",
  "homepage.html",
  "join.html",
  "post_pk.html",
];

export const firebaseConfig = {
  apiKey: config.FIREBASE_KEY,
  authDomain: config.AUTH_DOMAIN,
  projectId: config.PROJECT_ID,
  storageBucket: config.STORAGE_BUCKET,
  messagingSenderId: config.MESSAGING_SENDER_ID,
  appId: config.APP_ID,
  mesurementid: config.MEASUREMENT_ID,
};
export let app;
export default async function oAuth() {
  app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  return new Promise(async (resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      const currentEndpoint = window.location.pathname;
      const path = window.location.pathname.split("/");
      const currentPath = path[path.length - 1];
      console.log(currentEndpoint);
      if (!user && allowPage.includes(currentEndpoint)) {
        return (window.location.href = "./return.html");
      }
      try {
        const response = await api.account.verify();
        userInfo = new User(response);
        resolve(userInfo);
      } catch (e) {
        console.log(e);
        reject(e);
      }
      if (userInfo) {
        let this_url = window.location.href.split('/').reverse()[0];
        if (userInfo.nickname == null || userInfo.nickname.trim().length) {
          if(this_url == "index.html"){
            window.location.href = "./html/profile.html";
          }else{
            window.location.href = "./profile.html";
          }
        } else {
          if (allowPage.includes(currentPath)) {
            if(this_url == "index.html"){
              window.location.href = "./html/profile.html";
            }else{
              window.location.href = "./profile.html";
            }
          }
        }
      }
    });
  });
}

export let userInfo;
