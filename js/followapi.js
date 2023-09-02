function checkFollow(res){
    const user = JSON.parse(sessionStorage.user)
    const idtoken = user.stsTokenManager.accessToken
    const baseurl = 'http://3.37.239.49/'
    const personalInfo = JSON.parse(sessionStorage.personalInfo)
    let relInfo = res
    console.log(relInfo)

    const checking = async()=>{
        const result = await fetch(`${baseurl}api/v1/account/follow/${personalInfo.nickname}/?f=true`,{
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
            // res = 내가 팔로잉 한 사람들
            // relInfo = 상대방 닉네임
            // if(personalInfo.nickname !== relInfo.user.nickname){
            // let followbtn = document.querySelector('.talk-icon').nextElementSibling
            // let count = res.length > 0 ? res.length : 1
            // for(let i = 0; i < count; i++){
            //     if(res.length == 0 || res[i].nickname.search(relInfo.user.nickname) == -1){
            //         followbtn.innerHTML = `<button onclick=followClick()>팔로우</button>`
            //         followbtn.classList.remove('unfollowing')
            //         followbtn.classList.add('follow-btn')
            //     }
            //     else{
            //         followbtn.innerHTML = `<button onclick =followClick()>언팔로우</button>`
            //         followbtn.classList.remove('follow-btn')
            //         followbtn.classList.add('unfollowing')
            //     }
            // }
            // }
            let followbtn = document.querySelector('.talk-icon').nextElementSibling
            if(!res.filter((e)=>e.email == relInfo.user.email).length){
                followbtn.innerHTML = `<button onclick=followClick()>팔로우</button>`
                followbtn.classList.remove('unfollowing')
                followbtn.classList.add('follow-btn')
            }else{
                followbtn.innerHTML = `<button onclick =followClick()>언팔로우</button>`
                followbtn.classList.remove('follow-btn')
                followbtn.classList.add('unfollowing')
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    checking()
}


function followClick (){
    const user = JSON.parse(sessionStorage.user)
    const idtoken = user.stsTokenManager.accessToken
    const baseurl = 'http://3.37.239.49/'

    setTimeout(async () => {
        const findnick = document.querySelector('.user-nick').innerText
        console.log(findnick)
        const result = await fetch(`${baseurl}api/v1/account/follow/${findnick}/`,{
            method : 'POST',
            headers : {
                Authorization: `Bearer ${idtoken}`
            }
        })
        .then((res)=>{
            return res.json()
        })
        .then((res)=>{
            console.log(res)
            window.location.reload(true)
        })
        .catch((err)=>{
            console.log(err)
        })
    }, 200);
}



