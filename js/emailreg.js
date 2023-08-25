
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
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";


const app = initializeApp(firebaseCongif);

document.querySelector('.next-btn').addEventListener('click',(e)=>{
    e.preventDefault()
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    const back = document.querySelector('.back-black');
    const pop = document.querySelector('.popup');
    
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
    .then((res)=>{
        sendEmailVerification(auth.currentUser);
        if(sendEmailVerification){
            back.classList.add('dibl')
            pop.classList.add('dibl')
        }
        else{
            console.log('error: style apply failed')
        }
    })
    .then((res)=>{
        setTimeout(() => {
            back.classList.add('op07')
            pop.classList.add('op1')
        }, 300);
    })
    .catch((err)=>{
        console.log('error')
        const errorCode = err.code;
        console.log(errorCode)
        const errormMessage = err.message;
        console.log(errormMessage)
    })
})

document.querySelector('.check-btn').addEventListener('click',(e)=>{
    window.location.href='/loginpage.html'
})
