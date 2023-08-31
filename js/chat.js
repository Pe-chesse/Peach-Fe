import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

document.querySelector('.talk-icon').onclick = function (e) {
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
    const baseurl = 'http://3.37.239.49/api/v1/';

    onAuthStateChanged(auth, async (user)=>{
        if(user){
            const idtoken = await user.getIdToken();

            const contentPost = async ()=>{
                const result = await fetch(`${baseurl}account/verify/`, {
                    method : "GET",
                    headers : {
                        Authorization: `bearer ${idtoken}`,
                    }
                })
                .then((res)=>{
                    return res.json();
                })
                .then((res)=>{
                    console.log(res);
                })
                .catch((err)=>{
                    console.log(err);
                })
            }
            contentPost();

            const createTalkRoom = async ()=>{
                const result = await fetch(`${baseurl}chat/create/`, {
                    method : "POST",
                    headers : {
                        Authorization: `bearer ${idtoken}`
                    },
                    body : {
                        nickname: 'aaaaa'
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
        }
    })

    // window.location.href="./chat_room.html"

    
};


// let chatSocket

// document.querySelector('#chat-connect').onclick = function (e) {

//     chatSocket = new WebSocket(`ws://3.37.239.49/ws/v1/chat/sb8UsxzLYVMVsyQ0oiPqN5TPJsv1/`);
//     // chatSocket = new WebSocket(`ws://127.0.0.1:8000/ws/v1/chat/sb8UsxzLYVMVsyQ0oiPqN5TPJsv1/`);

//     chatSocket.onmessage = function (e) {
//     const data = JSON.parse(e.data);
//     console.log(data)
//     document.querySelector('#chat-log').value += `${JSON.stringify(data)}\n`;
//     };

//     chatSocket.onclose = function (e) {
//     console.error('Chat socket closed unexpectedly');
//     };
// };