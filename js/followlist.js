function personalprofileList (){
    const user = JSON.parse(sessionStorage.user)
    const mine = JSON.parse(sessionStorage.personalInfo)
    const idtoken = user.stsTokenManager.accessToken
    const baseurl = 'http://3.37.239.49/api/v1/'
    console.log(mine)

    const mylist = async ()=>{
        const result = await fetch(`${baseurl}account/follow/${mine.nickname}/?f=true`,{
            method : "GET",
            headers : {
                Authorization: `Bearer ${idtoken}`
            }
        })
        .then((res)=>{
            return res.json()
        })
        .then((res)=>{
            window.sessionStorage.setItem('mylist', JSON.stringify(res))
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    mylist()
}
personalprofileList()


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

            let yourfollowlist = []
            for(let i = 0; i < res.length; i++){
                yourfollowlist.push(res[i].nickname)
            }
            console.log(yourfollowlist)

            let followlistTem = res.map((a,i)=>{
                const mylist = JSON.parse(sessionStorage.mylist)
                console.log(mylist[i].nickname)
                return(
                    `        <div class="followers">
                    <div class="user-main-img">
                        <img src=${res[i].image_url == null || res[i].image_url == '' ? '../img/peach_cha.png' : res[i].image_url} alt="profile-image" "/>
                    </div>
                    <div class="user-info">
                        <h2>${res[i].nickname}</h2>
                    </div>
                    ${
                        mylist[i].nickname.includes(yourfollowlist) ?
                        `<div class="unfollowing">
                        <button class="follow">언팔로우</button>
                        </div>`
                        :
                        `<div class="followBtn">
                        <button class="follow">팔로우</button>
                        </div>`
                    }


                </div>
        `
                )
            }).join('')
            document.querySelector('.follower-list').innerHTML = followlistTem
        })
    }
    console.log(user)
    getList()
}

followlist()



// window.addEventListener('beforeunload', function(event) {
//     if (window.location.href.includes('/html/followers.html') || window.location.href.includes('/html/followings.html') ) {
//         sessionStorage.removeItem('usernick');
//     }
// });
// console.log(!window.location.href.includes('/html/followers.html') && !window.location.href.includes('/html/followings.html'))