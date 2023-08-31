const firebaseConfig = {
    apiKey: config.FIREBASE_KEY,
    authDomain: config.AUTH_DOMAIN,
    projectId: config.PROJECT_ID,
    storageBucket: config.STORAGE_BUCKET,
    messagingSenderId: config.MESSAGING_SENDER_ID,
    appId: config.APP_ID,
    mesurementid : config.MEASUREMENT_ID,
};



import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const baseurl = 'http://3.37.239.49/'

onAuthStateChanged(auth, (user)=>{
    if(user){
        const idtoken = auth.currentUser.getIdToken().then((res)=>{
            console.log(res)
            return res
        })
        console.log(idtoken)
        const contentPost = async()=>{
            const result = await fetch(`${baseurl}`+'api/v1/post',{
                method : "GET",
                Authorization: `${idtoken}`
            })
            .then((res)=>{
                return res.json()
            })
            .then((res)=>{
                console.log(res)
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        contentPost()
    }
    else{
        document.querySelector('body').innerHTML=''
        window.location.href="/html/return.html"
    }
})

