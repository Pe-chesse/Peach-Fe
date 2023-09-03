
const user = JSON.parse(sessionStorage.user)
const idtoken = user.stsTokenManager.accessToken
const baseurl = 'http://3.37.239.49/'

console.log(user)
const loadContent = async()=>{
    const result = await fetch(`${baseurl}api/v1/post/`,{
        method : "GET",
        headers : {
            Authorization: `Bearer ${idtoken}`
        }
    })
    .then((res)=>{
        return res.json()
    })
    .then((res)=>{
        let sortContent = [...res]
        sortContent.sort((a,b) => (a.id < b.id ? 1 : -1))
        console.log(sortContent)
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
                console.log(sortContent[i].user.image_url)
                function time(date) {
                    const seconds = 1;
                    const minute = seconds * 60;
                    const hour = minute * 60;
                    const day = hour * 24;
                    
                    let now = new Date
                    let timeresult = new Date(sortContent[i].updated_at.replaceAll("T"," ").substr(0,19))
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

                    return(
                `
                <article class="post" id=${sortContent[i].id}>
                    <div class="post-userinfo">
                        <div class="post-userinfo-img">
                            ${sortContent[i].user.image_url == null || "" ? `<img src="../img/peach_cha.png" alt="post-profile-img"/>` :`<img src="${sortContent[i].user.image_url}" alt="user-profile-image"/>`}
                        </div>
                        
                        <h2 class="user-nick"><a href="./my_profile.html?nickname=${sortContent[i].user.nickname}">${sortContent[i].user.nickname}</a></h2>
                        <p class="timepass">${time()}</p>
                        
                    </div><!--//post-userinfo-->

                    <div class="post-content">
                    <a href="./post_pk.html" onclick="sessionStorage.setItem('write_post_id', ${sortContent[i].id});"><p>${sortContent[i].body}</p></a>
                    </div>

                    <div class="post-state">
                        <div class="post-like">
                            ${sortContent[i].is_like == false ? '<img src="../img/heart_off.png" alt="post-heart" class="like-icon"/>' : '<img src="../img/heart.png" alt="like_icon" class="like-icon"/>'}
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
                </article><!--//post-->
            `
                    )
                }).join('')
                
            document.querySelector('.content').innerHTML = result;
            setLikecount(sortContent)
            
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}

loadContent()




