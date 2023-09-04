
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";


const auth = getAuth();

const logoutbtn = document.querySelector('.logout-btn')

logoutbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    signOut(auth)
    .then((res)=>{
        window.location.href="./index.html"
        window.sessionStorage.removeItem('user')
        window.sessionStorage.removeItem('personalInfo')
        window.sessionStorage.removeItem('usernick')
        window.sessionStorage.removeItem('write_post_id')
    })
    .catch((err)=>{
        const errorCode = err.code
        console.log(errorCode)
        const errorMessage = err.message;
        console.log(errorMessage)
    })
})