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
const searchResults = document.querySelector('.searchResults');

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
                for (const user of res) {
                    const li = document.createElement('li');
                    li.innerHTML = userSearchInput.value;
                    searchResults.appendChild(li);
                }
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