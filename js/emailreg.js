require('dotenv').congif;
const firebaseCongif = {
    apiKey: process.env.FIREBASE_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    mesurementid : process.env.MEASUREMENT_ID,
};


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";


const app = initializeApp(firebaseCongif);

document.querySelector('.next-btn').addEventListener('click',(e)=>{
    e.preventDefault()
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    const auth = getAuth();
    console.log(email, password)
    createUserWithEmailAndPassword(auth, email, password)
    .then((res)=>{
        console.log('회원가입 메일 전송 완료')
        console.log(res)
        sendEmailVerification(auth.currentUser)
        if(auth.currentUser.emailVerified == true){
            console.log('이메일 인증 성공')
            window.location.href='/login.html'
        }
    })
    .catch((err)=>{
        console.log('회원가입 실패')
        const errorCode = err.code;
        const errormMessage = err.message;
    })
})
