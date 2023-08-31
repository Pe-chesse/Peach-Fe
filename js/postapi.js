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
            return res
        })
        const contentPost = async()=>{
            const result = await fetch(`${baseurl}`+'api/v1/post',{
                method : "GET",
                Authorization: `${idtoken}`
            })
            .then((res)=>{
                return res.json()
            })
            .then((res)=>{
                let sortContent = [...res]
                sortContent.sort((a,b) => (a.id < b.id ? 1 : -1))
                if(res.legnth < 1){
                    return (
                        `<div class="logo">
                            <img src="../img/Peach_logo.PNG" alt="복숭아_로고"/>
                            <div class="search-btn">
                                <button>검색하기</button>
                            </div>
                        </div>`
                    )
                }else{
                    let result = sortContent.map((a,i)=>{
                            return(
                    `<article class="post">
                        <div class="post-userinfo">
                            <div class="post-userinfo-img">
                                <img src="../img/peach_cha.png" alt="post-profile-img"/>
                            </div>
                            <h2 class="user-nick">${sortContent[i].user.nickname}</h2>
                            <i class="post-side-icon"><img src="../img/post_side_icon.png" alt="post-side-icon"/></i>
                        </div><!--//post-userinfo-->
        
                        <div class="post-content">
                            <p>${sortContent[i].body}</p>
                        </div>
        
                        <div class="post-state">
                            <div class="post-like">
                                <img src="../img/heart_off.png" alt="post-heart"/>
                                <p class="like-count">${sortContent[i].like_length}</p>
                            </div>
                            <div class="post-comment">
                                <img src="../img/icon_comment.png" alt="post-comment"/>
                                <p class="comment-count">${sortContent[i].comment_length}</p>
                            </div>
                        </div>
                        <div class="post-date">
                            <p>${sortContent[i].updated_at.substr(0,10)}</p>
                        </div>
                    </article><!--//post-->`
                            )
                        }).join('')
                    document.querySelector('.content').innerHTML = result
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

