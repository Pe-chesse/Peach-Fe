function setLikecount(sortContent,result){
    const likeIcon = document.querySelectorAll('.like-icon')
    
    likeIcon.forEach((icon)=>{
        icon.addEventListener('click',(e)=>{
            let clickValue = e.target.closest('.post').getAttribute('id')
            console.log(clickValue)
            let likeCount = e.target.nextElementSibling
            console.log(sortContent[clickValue-1].like_length)
            const likeToggle = async()=>{
                const result = await fetch(`${baseurl}api/v1/post/like/`,{
                    method : "POST",
                    headers : {
                        'Content-Type' : 'application/json',
                        'Authorization' : `Bearer ${idtoken}`
                    },
                    body : JSON.stringify({
                        post: clickValue
                    })
                })
                .then((res)=>{
                    location.reload()
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
            likeToggle()
        })
    })
}


