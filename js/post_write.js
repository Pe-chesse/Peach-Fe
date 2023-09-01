import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: config.FIREBASE_KEY,
  authDomain: config.AUTH_DOMAIN,
  projectId: config.PROJECT_ID,
  storageBucket: config.STORAGE_BUCKET,
  messagingSenderId: config.MESSAGING_SENDER_ID,
  appId: config.APP_ID,
  mesurementid : config.MEASUREMENT_ID,
};

// const app = initializeApp(firebaseConfig);
// const auth = getAuth();
// const baseurl = "http://3.37.239.49/api/v1/";
// let idtoken;
// let myInfo;

// onAuthStateChanged(auth, async (user)=>{
//   if(user){
//     idtoken = await user.getIdToken();

//     const contentPost = async ()=>{
//       const result = await fetch(`${baseurl}account/verify/`, {
//           method : "GET",
//           headers : {
//               Authorization: `bearer ${idtoken}`,
//           }
//       })
//       .then((res)=>{
//           return res.json();
//       })
//       .then((res)=>{
//           myInfo = res;
//           document.querySelector(".profile_img").src = res.image_url;
//           console.log(res);
//       })
//       .catch((err)=>{
//           console.error(err);
//       })
//     }
//     contentPost();
//   }
// })

const textArea = document.querySelector(".upload_post");
const uploadImgBtn = document.querySelector(".upload_input");
const imgContainer = document.querySelector(".img-container");
let imageKeys;

uploadImgBtn.addEventListener("change", async function() {
  const f = this.files;

  let formData = new FormData();
  for(let i=0; i<f.length; i++){
    formData.append('files', f[i]);
  }
  console.log(formData.getAll('files'));

  if (f) {
    const result = await fetch(`${baseurl}bucket/media/`, {
      method: "POST",
      headers: {
          Authorization: `bearer ${idtoken}`,
      },
      body: formData,
    })
      .then(async (res) => {
        const data = await res.json();
        // console.log(data);
        imageKeys = data.image_keys;
        console.log(imageKey);
        // profileImgRenderer.src = `${baseurl}bucket/media/?key=${imageKey}`;
      })
      .catch((err) => {
        console.error(err);
      });
  }
});

document.querySelector(".btn-set-img").onclick = async function (e) {
  console.log('xbtn')
}




document.querySelector(".post_btn").onclick = async function (e) {
  
  console.log(textArea.value);

  let body = {
    nickname: profileNickname.value,
    description: profileIntroduce.value,
  };
  if (profileImg != null) {
    body.image_key = imageKey;
  }
  console.log('body: ' + body);

  await fetch(`${baseurl}accle/`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${idtoken}`,
    },
    body: JSON.stringify(body),
  })
    .then((res) => {
      console.log(res);
      window.location.href="./homepage.html"
    })
    .catch((err) => {
      console.error(err);
    });
};