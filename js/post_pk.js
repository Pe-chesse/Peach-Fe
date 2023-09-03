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
let postContent;

//내정보
onAuthStateChanged(auth, async (user)=>{
    if(user){
        idtoken = await user.getIdToken();

        const contentPost = async ()=>{
        const result = await fetch(`${baseurl}account/verify/`, {
            method : "GET",
            headers : {
                Authorization: `bearer ${idtoken}`,
            }
        })
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            console.log(res)
            document.querySelector(".comment-write-area-user").src = res.image_url??'../img/peach_cha.png'

            console.log(res);
        })
        .catch((err)=>{
            console.error(err);
        })
    }
        contentPost();
    }
})

let writePostId = sessionStorage.getItem("write_post_id");
sessionStorage.removeItem("write_post_id");
// console.log(writePostId)
if(writePostId === null){
    writePostId = 25;//test post id
}

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
        document.querySelector(".post-user-img").src = postContent.user.image_url;
        document.querySelector(".post-content-info-nick").textContent = postContent.user.nickname;
        const updatedTime = new Date(postContent.updated_at);
        const nowTime = new Date();
        const diffTime = nowTime.getTime() - updatedTime.getTime();
        let viewTime = `${Math.floor(diffTime/(60*60*1000))}시간 전`;
        document.querySelector(".post-content-info-time").textContent = viewTime;
        document.querySelector(".post-content-text").innerHTML = `<p>${postContent.body}</p>`;
        for(let i=0; i<postContent.image_url.length; i++){
            document.querySelector(".post-content-img").innerHTML += `<img class="post-img-list" src="${postContent.image_url[i]}" alt="post-img-list"/>`;
        }
        document.querySelector(".like-count").textContent = postContent.like_length;

        for(let i=0; i<postContent.comment_set.length; i++){
            let commentHtml = `
            <div class="comment-list">
                <img class="comment-list-img" src="../img/peach-user.png" alt="comment-list-img"/>
                <div class="comment-list-content">
                    <div class="comment-list-content-info">
                        <h3 class="comment-list-content-info-user">행복한 복숭아 농장</h3>
                        <p class="comment-list-content-info-time">5분 전</p>
                    </div>
                    <p class="comment-list-content-text">제발 헛소리좀 하지마요..</p>
                </div>
                <img class="comment-list-side-icon" src="../img/post_side_icon.png" alt="comment-list-side-icon">
            </div>`;
            document.querySelector(".comment-area").innerHTML += commentHtml;
        }
    })
    .catch((err) => {
        console.error(err);
    });
})();


// `${baseurl}post/${writePostId}/` 댓글
// `${baseurl}post/comment/44/` 대댓글

//댓글 보내기
// document.querySelector(".comment-write-area-submit").onclick = async function (e) {
//     let body = {
//         body: document.querySelector(".comment-write-area-textarea").value,
//     };
//     console.log(body);

//     await fetch(`${baseurl}post/${writePostId}/`, {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `bearer ${idtoken}`,
//         },
//     body: JSON.stringify(body),
//     })
//     .then((res) => {
//         return res.json();
//     })
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.error(err);
//     });
// };


// const commentInput = document.getElementById('comment-input');
// const commentingButton = document.getElementById('commenting');

// commentInput.addEventListener('input', function () {
//     if (commentInput.value.trim() !== '') {
//         commentingButton.style.color = '#FFBFBF';
//     } else {
//         commentingButton.style.color = '#C4C4C4';
//     }
// });


// 댓글 작성 버튼 클릭 이벤트 리스너 추가
document.querySelector(".comment-write-area-submit").addEventListener("click", async function () {
    try {
        // 사용자가 입력한 댓글 내용 가져오기
        const commentText = document.querySelector(".comment-write-area-textarea").value;

        // API를 사용하여 댓글 작성 요청 보내기
        const api = new api();
        const response = await api.comment.write(postId, commentText);

        // 댓글 작성 성공 시, 화면에 댓글 추가
        const commentList = document.querySelector(".comment-area");
        const commentItem = document.createElement("div");
        commentItem.className = "comment-list";
        commentItem.innerHTML = `
            <img class="comment-list-img" src="../img/peach-user.png" alt="comment-list-img"/>
            <div class="comment-list-content">
                <div class="comment-list-content-info">
                    <h3 class="comment-list-content-info-user">${response.user.nickname}</h3>
                    <p class="comment-list-content-info-time">방금 전</p>
                </div>
                <p class="comment-list-content-text">${response.body}</p>
            </div>
            <img class="comment-list-side-icon" src="../img/post_side_icon.png" alt="comment-list-side-icon">
        `;
        commentList.appendChild(commentItem);

        // 댓글 입력창 초기화
        document.querySelector(".comment-write-area-textarea").value = "";
    } catch (error) {
        console.error("댓글 작성 중 오류 발생:", error);
    }
});
