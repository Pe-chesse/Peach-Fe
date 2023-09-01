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
                    const profileImg = document.createElement('img');
                    profileImg.src = user.image_url??'/img/peach_cha.png'
                    // css 추가
                    profileImg.style.width='40px';
                    profileImg.style.height='40px';
                    //
                    searchResults.appendChild(profileImg);
                    const nickname = document.createElement('p');
                    nickname.textContent = user.nickname;
                    searchResults.appendChild(nickname);
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

// // profileImg와 nickname을 수평으로 배치하기 위해 flexbox를 사용합니다.
// searchResults.style.display = 'flex';
// searchResults.style.flexDirection = 'row';

// // profileImg와 nickname의 너비를 동일하게 설정합니다.
// profileImg.style.width = '40px';
// nickname.style.width = '40px';

// // profileImg와 nickname의 간격을 10px로 설정합니다.
// profileImg.style.marginLeft = '10px';