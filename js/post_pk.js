import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: config.FIREBASE_KEY,
    authDomain: config.AUTH_DOMAIN,
    projectId: config.PROJECT_ID,
    storageBucket: config.STORAGE_BUCKET,
    messagingSenderId: config.MESSAGING_SENDER_ID,
    appId: config.APP_ID,
    mesurementid : config.MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const baseurl = "http://3.37.239.49/api/v1/";
let idtoken;
let myInfo;
let postContent;

//내정보
// onAuthStateChanged(auth, async (user)=>{
//     if(user){
//         idtoken = await user.getIdToken();

//         const contentPost = async ()=>{
//         const result = await fetch(`${baseurl}account/verify/`, {
//             method : "GET",
//             headers : {
//                 Authorization: `bearer ${idtoken}`,
//             }
//         })
//         .then((res)=>{
//             return res.json();
//         })
//         .then((res)=>{
//             myInfo = res;
//             document.querySelector("#peach-user").src = myInfo.image_url;
//             document.querySelector("#posting-user").textContent = myInfo.nickname;
//             console.log(res);
//         })
//         .catch((err)=>{
//             console.error(err);
//         })
//         }
//         contentPost();
//     }
// })

const imgArea = document.querySelector(".img-area");
let writePostId = sessionStorage.getItem("write_post_id");
sessionStorage.removeItem("write_post_id");
// console.log(writePostId)
writePostId = 25;

//포스트정보
(async function() {
    await fetch(`${baseurl}post/${writePostId}/`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            // Authorization: `bearer ${idtoken}`,
        },
    })
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        console.log(res);
        postContent = res;
        document.querySelector("#peach-user").src = postContent.user.image_url;
        document.querySelector("#posting-user").textContent = postContent.user.nickname;
        document.querySelector("#main-text").innerHTML = `<p>${postContent.body}</p>`;
        const updatedTime = new Date(postContent.updated_at);
        const nowTime = new Date();
        const diffTime = nowTime.getTime() - updatedTime.getTime();
        let viewTime = `${Math.floor(diffTime/(60*60*1000))}시간 전`;
        document.querySelector("#update-time").textContent = viewTime;
        for(let i=0; i<postContent.image_url.length; i++){
            imgArea.innerHTML += `<img class="posting-img" src="${postContent.image_url[i]}" alt="posting-img"/>`;
        }
        document.querySelector("#heart-cnt").textContent = postContent.like_length;
    })
    .catch((err) => {
        console.error(err);
    });
})();



const commentInput = document.getElementById('comment-input');
const commentingButton = document.getElementById('commenting');

commentInput.addEventListener('input', function () {
    if (commentInput.value.trim() !== '') {
        commentingButton.style.color = '#FFBFBF';
    } else {
        commentingButton.style.color = '#C4C4C4';
    }
});
