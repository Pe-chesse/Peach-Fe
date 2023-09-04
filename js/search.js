// homepage.html 이동
const prevButton = document.querySelector('.prev-button');
prevButton.addEventListener('click', () => {
    window.location.href = './homepage.html';
});


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

const userSearchInput = document.querySelector('.userSearch');
const searchResults = document.querySelector('.container');

onAuthStateChanged(auth, (user) => {
    if (user) {
        const idtoken = auth.currentUser.getIdToken().then((res) => {
            console.log(res);
            return res;
        });
        console.log(idtoken);
        console.log(userSearchInput.value)
        const contentPost = async () => {
            const result = await fetch(`${baseurl}` + `api/v1/account/search/?user=${userSearchInput.value}`, {
                method: "GET",
                Authorization: `${idtoken}`
            })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                console.log(res);
                searchResults.innerHTML = '';
                res.forEach((user) => {
                    
                    console.log(user)
                    // 유저가 검색한 이름 색상 변경
                    let insertpoint = user.nickname.indexOf(`${userSearchInput.value}`)
                    let startingSlice = user.nickname.slice(0, insertpoint);
                    let insertText = `<span class="keyword">${userSearchInput.value}</span>`
                    let lastSlice = user.nickname.slice(insertpoint , user.nickname.length).replace(`${userSearchInput.value}`,'')
                    let sumNickname = startingSlice + insertText + lastSlice;

                    // html 요소 추가
                    const profileImg = document.createElement('img');
                    const div = document.createElement('div');
                    const nickname = document.createElement('p');
                    const a = document.createElement('a')
                    searchResults.appendChild(div)
                    div.setAttribute('class','searched-user')
                    div.appendChild(a)
                    a.appendChild(profileImg)
                    a.setAttribute('href',`my_profile.html?nickname=${user.nickname}`)
                    profileImg.setAttribute('src',`${user.image_url == null || user.image_url == ' ' ? '../img/peach_cha.png' : user.image_url}`)
                    profileImg.setAttribute('alt',"user-profile-image")
                    a.appendChild(nickname)
                    nickname.setAttribute('class','searched-user-nick')
                    nickname.innerHTML = sumNickname
                });
            })
        .catch((err) => {
                console.log(err);
            });
        };
        document.querySelector('.top-area').addEventListener("submit", (event) => {
            event.preventDefault();
            contentPost();
        });
    }
});