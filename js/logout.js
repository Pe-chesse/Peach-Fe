const firebaseCongif = {
    apiKey: config.FIREBASE_KEY,
    authDomain: config.AUTH_DOMAIN,
    projectId: config.PROJECT_ID,
    storageBucket: config.STORAGE_BUCKET,
    messagingSenderId: config.MESSAGING_SENDER_ID,
    appId: config.APP_ID,
    mesurementid : config.MEASUREMENT_ID,
};


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

const app = initializeApp(firebaseCongif);
const auth = getAuth();

const logoutbtn = document.querySelector('.logout-btn')

logoutbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    signOut(auth)
    .then((res)=>{
        window.location.href="/"
    })
    .catch((err)=>{
        const errorCode = err.code
        console.log(errorCode)
        const errorMessage = err.message;
        console.log(errorMessage)
    })
})