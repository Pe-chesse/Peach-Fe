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
        // 현재 URL의 쿼리 문자열을 가져옴
        var queryString = window.location.search;

        // 쿼리 문자열에서 "?" 문자를 제거
        queryString = queryString.slice(1);

        // 쿼리 문자열을 파싱하여 파라미터를 객체 형태로 추출
        var queryParams = {};
        var pairs = queryString.split('&');

        pairs.forEach(function(pair) {
            var keyValue = pair.split('=');
            var key = decodeURIComponent(keyValue[0]);
            var value = decodeURIComponent(keyValue[1]);
            queryParams[key] = value;
        });
        const contentPost = async()=>{
            const result = await fetch(`${baseurl}`+`api/v1/account/profile/?user=${queryParams.nickname}`,{
                method : "GET",
                Authorization: `${idtoken}`
            })
            .then((res)=>{
                return res.json()
            })
            .then((res)=>{
                console.log(res)
                // 상단 user 프로필 소개
                document.querySelector('.followers').innerHTML = res.user.followers_length
                document.querySelector('.followings').innerHTML = res.user.followings_length
                document.querySelector('.profile-img').innerHTML = res.user.image_url??'/img/peach_cha.png'
                document.querySelector('.user-nickname').innerHTML = res.user.nickname
                document.querySelector('.user-des').innerHTML = res.user.description
                
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