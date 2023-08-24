import { initializeApp } from 'firebase/app';
import dotenv from 'dotenv'
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth';
dotenv.config();


const firebaseCongif = {
    apiKey: process.env.FIREBASE_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
};

const app = initializeApp(firebaseCongif);

const joinWithVerification = async (email,password) => {
    try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(auth.currentUser);
        alert(authMessage['auth/post-email-verification-mail']);
    }
    catch({code, message}) {
        alert(errorMessage[code])
    }
}


document.querySelector('.next-btn').addEventListener('click',(e)=>{
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value; 
    console.log(email)
    console.log(password)
    e.preventDefault()
    joinWithVerification(email, password)
})
