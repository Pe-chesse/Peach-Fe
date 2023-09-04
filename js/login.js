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
import { getAuth, signInWithEmailAndPassword, sendEmailVerification} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

const app = initializeApp(firebaseCongif);
const auth = getAuth();

const loginbtn = document.querySelector('.login-btn')

loginbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    let email = document.querySelector('.email').value;
    let password = document.querySelector('.password').value;
    signInWithEmailAndPassword(auth,email,password)
    .then((res)=>{
        if(auth.currentUser.emailVerified === false){
            document.querySelector('.email-verify').classList.add('disfl')
            setTimeout(() => {
                document.querySelector('.email-verify').style.opacity=1;
            }, 300);
            document.querySelector('.resend').addEventListener('click',(e)=>{
                e.preventDefault();
                sendEmailVerification(auth.currentUser)
                document.querySelector('.email-verify').style.opacity=0
                setTimeout(() => {
                    document.querySelector('.email-verify').classList.remove('disfl')
                },300);
            })
            
            document.querySelector('.confirm').addEventListener('click',(e)=>{
                e.preventDefault();
                document.querySelector('.email-verify').style.opacity=0
                setTimeout(() => {
                    document.querySelector('.email-verify').classList.remove('disfl')
                }, 300);
            })
        }
        else{
            window.sessionStorage.setItem('user', JSON.stringify(auth.currentUser) )
        }
        })
        .then((res)=>{
            const user = JSON.parse(sessionStorage.user)
            const idtoken = user.stsTokenManager.accessToken
            const baseurl = 'http://3.37.239.49/'
            console.log(user)
            const filterNewUser = async()=>{
                const result = await fetch(`${baseurl}api/v1/account/verify/`,{
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${idtoken}`
                    }
                })
                .then((res)=>{
                    return res.json()
                })
                .then((res)=>{
                    if(res.nickname !== null && res.nickname !== " "){
                        window.sessionStorage.setItem('personalInfo',JSON.stringify(res))
                        window.location.href="./homepage.html"
                    }
                    else{
                        window.location.href="./profile.html"
                    }
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
            filterNewUser()
        })
    .catch((error)=>{
        document.querySelector('.login-warn').style.opacity=1
        console.log('로그인 실패')
        const errorCode = error.code;
        console.log(errorCode)
        const errorMessage = error.message;
        console.log(errorMessage)
    })
})

