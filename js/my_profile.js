const firebaseConfig = {
    apiKey: config.FIREBASE_KEY,
    authDomain: config.AUTH_DOMAIN,
    projectId: config.PROJECT_ID,
    storageBucket: config.STORAGE_BUCKET,
    messagingSenderId: config.MESSAGING_SENDER_ID,
    appId: config.APP_ID,
    mesurementid : config.MEASUREMENT_ID,
};

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";


const auth = getAuth();
const baseurl = 'http://3.37.239.49/'


onAuthStateChanged(auth, (user)=>{
    if(user){
        const idtoken = auth.currentUser.getIdToken().then((res)=>{
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
                checkFollow(res)
                // 프로필 검증
                function verfiyProfile (){
                    let personalInfo = JSON.parse(sessionStorage.personalInfo)
                    let findClass = document.querySelector('.profile-op')
                    console.log(res)
                    console.log(personalInfo)
                    if(personalInfo.nickname != res.user.nickname){
                        findClass.innerHTML = `<button>팔로우</button>`
                        findClass.classList.add('follow-btn')
                        document.querySelector('.tab-menu-profile').classList.remove('on')
                    }else{
                        findClass.innerHTML = `<a href="./my_profile_set.html">프로필 수정</a>
                        <a href="./product_write.html">상품 등록</a>`
                    }
                }
                verfiyProfile()
                let followListBtn = document.querySelectorAll('.main-profile-follow a')
                followListBtn.forEach((e)=>{
                    e.addEventListener('click',(e)=>{
                        window.sessionStorage.setItem('usernick',JSON.stringify(res))
                    })
                })
                // 상단 user 프로필 소개
                document.querySelector('.followers').innerHTML = res.user.followers_length
                document.querySelector('.followings').innerHTML = res.user.followings_length
                document.querySelector('.profile-img img').setAttribute('src', res.user.image_url == null || res.user.image_url == '' ? '../img/peach_cha.png' : res.user.image_url)
                document.querySelector('.user-nickname').innerHTML = res.user.nickname
                document.querySelector('.user-des').innerHTML = res.user.description
                console.log(res)
                // 사용자의 게시글
                if (res.post) {
                    res.post.sort((a, b) => b.createdAt - a.createdAt);
                
                    res.post.forEach((post) => {
                        const user_img = post.user.image_url??'/img/peach_cha.png';
                        const user_nick = post.user.nickname;
                        const post_img = post.image_url;
                        const post_content = post.body;
                        const post_date = post.updated_at;
                        document.querySelector('.post-userinfo-img').innerHTML = `<img src="${user_img}" alt="user-img">`;
                        document.querySelector('.user-nick').innerHTML = user_nick;
                        document.querySelector('.post-content').innerHTML = post_img;
                        document.querySelector('.post-content').innerHTML = post_content;
                        document.querySelector('.post-date').innerHTML = post_date;
                    });
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        contentPost()
    }
    else{
        document.querySelector('body').innerHTML=''
        window.location.href="./return.html"
    }
})






