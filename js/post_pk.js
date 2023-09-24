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

// 내정보
function getUserInfo(){
    const user = JSON.parse(sessionStorage.user)
    const idtoken = user.stsTokenManager.accessToken
    let finduser = async ()=>{
        const result = await fetch(`${baseurl}account/verify/`,{
            method : 'GET',
            headers : {
                Authorization: `bearer ${idtoken}`,
            }
        })
        .then((res)=>{
            return res.json()
        })
        .then((res)=>{
            console.log(res)
            document.querySelector(".comment-write-area-user").src = res.image_url??'../img/peach_cha.png'
            return res
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    finduser()
}
getUserInfo()


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
            Authorization: `bearer ${idtoken}`,
        },
    })
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        console.log(res);
        postContent = res;
        

        // 데이터 셋
        document.querySelector(".post-user-img").src = postContent.user.image_url == null ? '../img/peach_cha.png' : postContent.user.image_url;
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
        console.log(document.querySelector('.post-like img'))
        document.querySelector('.post-like img').setAttribute('src', postContent.is_like ? '../img/heart.png' : '../img/heart_off.png')
        document.querySelector(".like-count").textContent = postContent.like_length;
        document.querySelector('.delete-modal-content').innerHTML = postContent.user.nickname == JSON.parse(window.sessionStorage.personalInfo).nickname ? `<img class="post-user-side-icon" src="../img/post_side_icon.png" alt="post-user-side-icon"/>`: '' ;
        


        let insertCommnet =  postContent.comment_set.map((a,i)=>{
            console.log(postContent.comment_set[i].updated_at)
            function time(date) {
                const seconds = 1;
                const minute = seconds * 60;
                const hour = minute * 60;
                const day = hour * 24;
                
                let now = new Date
                let timeresult = new Date(date.replaceAll("T"," ").substr(0,19))
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
            console.log(postContent.user.nickname)
            console.log(JSON.parse(window.sessionStorage.personalInfo).nickname)
            console.log(postContent.comment_set[i].user.nickname)
            return(
                `
                <div class="comment-list" id=${i}>
                <div class="comment-list-img">
                <img src="${postContent.comment_set[i].user.image_url == null ? '../img/peach_cha.png' : postContent.comment_set[i].user.image_url}" alt="comment-list-img"/>
                </div>
                <div class="comment-list-content" id='${postContent.comment_set[i].id}'>
                    <div class="comment-list-content-info">
                        <h3 class="comment-list-content-info-user">${postContent.comment_set[i].user.nickname}</h3>
                        <p class="comment-list-content-info-time">${time(postContent.comment_set[i].updated_at)}</p>
                    </div>
                    <p class="comment-list-content-text">${postContent.comment_set[i].body}</p>
                </div>
                ${
                    postContent.comment_set[i].user.nickname == JSON.parse(window.sessionStorage.personalInfo).nickname ?'<img class="comment-list-side-icon" src="../img/post_side_icon.png" alt="comment-list-side-icon">' : ''
                }
                </div>
                <div class="comment-child-input">
                    <div class="writing-user">
                        <img src='${JSON.parse(window.sessionStorage.personalInfo).image_url == null  ? '../img/peach_cha.png' : JSON.parse(window.sessionStorage.personalInfo).image_url}' alt="user-profile-image"/>
                    </div>
                    <input class="child-comment-write"/>
                    <button class="child-comment-submit">등록</button>
                </div>
                ${postContent.comment_set[i].child_comments != '' ? postContent.comment_set[i].child_comments.map((a,idx) => {
                    return(
                        `
                        <div class='child-comment'>
                            <img class="child-comment-list-img" src = "${postContent.comment_set[i].child_comments[idx].user.image_url == null ? '../img/peach_cha.png' : postContent.comment_set[i].child_comments[idx].user.image_url}" alt="commnent-child-img"/>
                        <div class="child-comment-list-content">
                        <div class="child-comment-list-content-info">
                            <h3 class="child-comment-list-content-info-user">${postContent.comment_set[i].child_comments[idx].user.nickname}</h3>
                            <p class="child-comment-list-content-info-time">${time(postContent.comment_set[i].child_comments[idx].updated_at)}</p>
                        </div>
                        <p class="child-comment-list-content-text">${postContent.comment_set[i].child_comments[idx].body}</p>
                    </div>
                    <img class="child-comment-list-side-icon" src="../img/post_side_icon.png" alt="child-comment-list-side-icon">
                    </div>
                        
                        `
                        )
                    }).join(''): ''
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
    const user = JSON.parse(sessionStorage.user)
    const idtoken = user.stsTokenManager.accessToken
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
        window.location.reload()
    })
    .catch((err) => {
        console.error(err);
    });
};

// 대댓글 작성
setTimeout(() => {
    let commentList = document.querySelectorAll('.comment-list')
    let childComment = document.querySelectorAll('.comment-child-input')
    const user = JSON.parse(sessionStorage.user)
    const idtoken = user.stsTokenManager.accessToken
    console.log(childComment)

    commentList.forEach((e)=>{
        e.addEventListener('click',(e)=>{
            let findinput = childComment[e.target.id]
            findinput.classList.toggle('vi')
            
            childComment.forEach((e)=>{
                if(e !== findinput){
                    e.classList.remove('vi')
                }
            })
            e.target.nextElementSibling.lastElementChild.addEventListener('click', async ()=>{
                console.log(document.querySelector('.child-comment-write').value)
                await fetch(`${baseurl}post/comment/${e.target.children[1].id}/`,{
                    method : "POST",
                    headers :{
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${idtoken}`,
                    },
                    body : JSON.stringify({
                        body : document.querySelector('.child-comment-write').value
                    })
                })
                .then((res)=>{
                    return res.json()
                })
                .then((res)=>{
                    console.log(res)
                    window.location.reload()
                })
                .catch((err)=>{
                    console.log(err)
                })
            })
        })
    })
}, 200);


// const commentInput = document.getElementById('comment-input');
// const commentingButton = document.getElementById('commenting');

// commentInput.addEventListener('input', function () {
//     if (commentInput.value.trim() !== '') {
//         commentingButton.style.color = '#FFBFBF';
//     } else {
//         commentingButton.style.color = '#C4C4C4';
//     }
// });
