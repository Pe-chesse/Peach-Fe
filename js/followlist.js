

function followlist(){
    const user = JSON.parse(sessionStorage.user)
    const usernick = JSON.parse(sessionStorage.usernick)
    const idtoken = user.stsTokenManager.accessToken
    const baseurl = 'http://3.37.239.49/'
    console.log(usernick)
    // console.log(user)

    const getList = async ()=>{

        const result = await fetch(`${baseurl}api/v1/account/follow/${usernick.user.nickname}/${window.location.href.includes('/html/followers.html') ? '' : '?f=true'}`,{
            method : "GET",
            headers : {
                Authorization: `Bearer ${idtoken}`
            }
        })
        .then((res)=>{
            return res.json()
        })
        .then((res)=>{
            console.log(res)
            let followlistTem = res.map((a,i)=>{
                return(
                    `        <div class="followers">
                    <div class="user-main-img">
                        <img src=${res[i].image_url == null || res[i].image_url == '' ? '../img/peach_cha.png' : res[i].image_url} alt="profile-image" "/>
                    </div>
                    <div class="user-info">
                        <h2>${res[i].nickname}</h2>
                    </div>
                    <div class="followBtn">
                        <button class="follow">팔로우</button>
                    </div>
                </div>
        `
                )
            }).join()
            document.querySelector('.follower-list').innerHTML = followlistTem
        })
    }
    console.log(user)
    getList()
}
followlist()

window.addEventListener('beforeunload', function(event) {
    if (window.location.href.includes('/html/followers.html') || window.location.href.includes('/html/followings.html') ) {
        sessionStorage.removeItem('usernick');
    }
});
console.log(!window.location.href.includes('/html/followers.html') && !window.location.href.includes('/html/followings.html'))