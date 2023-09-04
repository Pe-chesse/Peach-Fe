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

        // 데이터 셋
        document.querySelector(".post-user-img").src = postContent.user.image_url;
        document.querySelector(".post-content-info-nick").textContent = postContent.user.nickname;
        
        // 시간 설정
        const updatedTime = new Date(postContent.updated_at);
        const nowTime = new Date();
        const diffTime = nowTime.getTime() - updatedTime.getTime();
        let viewTime = `${Math.floor(diffTime/(60*60*1000))}시간 전`;

        // 데이터 입히기
        document.querySelector(".post-content-info-time").textContent = viewTime;
        document.querySelector(".post-content-text").innerHTML = `<p>${postContent.body}</p>`;
        for(let i=0; i<postContent.image_url.length; i++){
            document.querySelector(".post-content-img").innerHTML += `<img class="post-img-list" src="${postContent.image_url[i]}" alt="post-img-list"/>`;
        }
        document.querySelector(".like-count").textContent = postContent.like_length;

        let insertCommnet =  postContent.comment_set.map((a,i)=>{
            function time(date) {
                const seconds = 1;
                const minute = seconds * 60;
                const hour = minute * 60;
                const day = hour * 24;
                
                let now = new Date
                let timeresult = new Date(postContent.comment_set[i].updated_at.replaceAll("T"," ").substr(0,19))
                let timecalc = Math.trunc((now.getTime() - timeresult.getTime()) / 1000);
                
                let elapsedText = "";
                if (timecalc < seconds) {
                    elapsedText = "방금 전";
                } else if (timecalc < minute) {
                    elapsedText = timecalc + "초 전";
                } else if (timecalc < hour) {
                    elapsedText = Math.trunc(timecalc / minute) + "분 전";
                } else if (timecalc < day) {
                    elapsedText = Math.trunc(timecalc / hour) + "시간 전";
                } else if (timecalc < (day * 15)) {
                    elapsedText = Math.trunc(timecalc / day) + "일 전";
                } else {
                    elapsedText = SimpleDateTimeFormat(date, "yyyy.M.d");
                }
                
                return elapsedText;
            }
            console.log(postContent.comment_set[i])
            console.log(postContent.comment_set[i].child_comments)
            return(
                `
                <div class="comment-list">
                <div class="comment-list-img">
                <img src="${postContent.comment_set[i].user.image_url == null ? '../img/peach_cha.png' : postContent.comment_set[i].user.image_url}" alt="comment-list-img"/>
                </div>
                <div class="comment-list-content">
                    <div class="comment-list-content-info">
                        <h3 class="comment-list-content-info-user">${postContent.comment_set[i].user.nickname}</h3>
                        <p class="comment-list-content-info-time">${time()}</p>
                    </div>
                    <p class="comment-list-content-text">${postContent.comment_set[i].body}</p>
                </div>
                <img class="comment-list-side-icon" src="../img/post_side_icon.png" alt="comment-list-side-icon">
                </div>
                ${postContent.comment_set[i].child_comments != '' ? postContent.comment_set[i].child_comments.map((a,idx) => {
                    return(
                        `
                        <div class='child-comment'>
                            <img class="child-comment-list-img" src = "${postContent.comment_set[i].child_comments[idx].user.image_url == null ? '../img/peach_cha.png' : postContent.comment_set[i].child_comments[idx].user.image_url}" alt="commnent-child-img"/>
                            <div class="child-comment-list-content">
                        <div class="child-comment-list-content-info">
                            <h3 class="child-comment-list-content-info-user">${postContent.comment_set[i].child_comments[idx].user.nickname}</h3>
                            <p class="child-comment-list-content-info-time">${time()}</p>
                        </div>
                        <p class="child-comment-list-content-text">${postContent.comment_set[i].child_comments[idx].body}</p>
                    </div>
                    <img class="child-comment-list-side-icon" src="../img/post_side_icon.png" alt="child-comment-list-side-icon">
                    </div>
                        </div>
                        `
                        )
                    }): ''
                }
                `
            )
        }).join('')

        document.querySelector('.comment-area').innerHTML = insertCommnet
    })

    .catch((err) => {
        console.error(err);
    });
})();


// `${baseurl}post/${writePostId}/` 댓글
// `${baseurl}post/comment/44/` 대댓글

//댓글 보내기
document.querySelector(".comment-write-area-submit").onclick = async function (e) {
    let body = {
        body: document.querySelector(".comment-write-area-textarea").value,
    };
    console.log(body);

    await fetch(`${baseurl}post/${writePostId}/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${idtoken}`,
        },
    body: JSON.stringify(body),
    })
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err);
    });
};


// const commentInput = document.getElementById('comment-input');
// const commentingButton = document.getElementById('commenting');

// commentInput.addEventListener('input', function () {
//     if (commentInput.value.trim() !== '') {
//         commentingButton.style.color = '#FFBFBF';
//     } else {
//         commentingButton.style.color = '#C4C4C4';
//     }
// });
