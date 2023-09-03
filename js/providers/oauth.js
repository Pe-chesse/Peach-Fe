import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { api } from "../services/api.js";
import User from "../models/user.js";

const allowPage = ["*"];

const firebaseConfig = {
  apiKey: config.FIREBASE_KEY,
  authDomain: config.AUTH_DOMAIN,
  projectId: config.PROJECT_ID,
  storageBucket: config.STORAGE_BUCKET,
  messagingSenderId: config.MESSAGING_SENDER_ID,
  appId: config.APP_ID,
  mesurementid: config.MEASUREMENT_ID,
};

export default async function oAuth() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();

  return new Promise(async (resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      const currentEndpoint = window.location.pathname;
      if (!user && allowPage.includes(currentEndpoint)) {
        return (window.location.href = "./return.html");
      }
      try {
        const response = await api.account.verify();
        userInfo = new User(response);
        firebaseUserInfo = user;
        resolve(userInfo); // userInfo 반환
      } catch (e) {
        console.log(e);
        reject(e); // 에러가 발생한 경우 reject
      }
    });
  });
}

export let userInfo;
export let firebaseUserInfo;
