document.querySelector('.start-btn').onclick = function (e) {
    const profileImg = document.querySelector('#profile-img');
    const profileNickname = document.querySelector('#nickname');
    const profileIntroduce = document.querySelector('#introduce');
    console.log(profileImg.value);
    console.log(profileNickname.value);
    console.log(profileIntroduce.value);

    const baseurl = 'http://3.37.239.49/api/v1/';

    const createTalkRoom = async ()=>{
        const result = await fetch(`${baseurl}account/profile/`, {
            method : "PUT",
            headers : {
                Authorization: `bearer ${idtoken}`
            },
            body : {
                nickname: 'aaaaa',
                description: ''
            }
        })
        .then((res)=>{
            console.log(res);
            // return res.json();
        })
        // .then((res)=>{
        //     console.log(res);
        // })
        .catch((err)=>{
            console.log(err);
        })
    }
    createTalkRoom();
};
