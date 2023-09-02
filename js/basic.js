// tab-menu
const tabMenuElements = document.querySelectorAll('.tab-menu-elements li');

tabMenuElements.forEach(element => {
    element.addEventListener('click', () => {
        tabMenuElements.forEach(otherElement => {
            otherElement.classList.remove('on');
        });
        element.classList.add('on');
    });
});

function tabProfile(){
    const user = JSON.parse(sessionStorage.user)
    const idtoken = user.stsTokenManager.accessToken
    const baseurl = 'http://3.37.239.49/'
    const findProfile = async()=>{
        const result = await fetch(`${baseurl}api/v1/account/verify/`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${idtoken}`
            }
        })
        .then((res)=>{
            return res.json()
        })
        .then((res)=>{
            const nickname = res.nickname
            document.querySelector('.tab-menu-profile a').setAttribute('href',`./my_profile.html?nickname=${nickname}`) 
        })
    }
    findProfile()
}
tabProfile()
