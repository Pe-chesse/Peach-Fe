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

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const baseurl = "http://3.37.239.49/api/v1/";
let idtoken;
let myInfo;

onAuthStateChanged(auth, async (user)=>{
  if(user){
    idtoken = await user.getIdToken();

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
          myInfo = res;
          document.querySelector(".profile_img").src = res.image_url;
          console.log(res);
      })
      .catch((err)=>{
          console.error(err);
      })
    }
    contentPost();
  }
})

const textArea = document.querySelector(".upload_post");
const uploadImgBtn = document.querySelector(".upload_input");
const imgContainer = document.querySelector(".img-container");
let imageKeys = [];

uploadImgBtn.addEventListener("change", async function() {
  const f = this.files;
  
  let formData = new FormData();
  for(let i=0; i<f.length; i++){
    formData.append('files', f[i]);
  }
  // console.log(formData.getAll('files'));

  if (f) {
    const result = await fetch(`${baseurl}bucket/media/`, {
      method: "POST",
      headers: {
          Authorization: `bearer ${idtoken}`,
      },
      body: formData,
    })
      .then(async (res) => {//이미지 요소 및 키 추가
        const data = await res.json();
        let tmp = imageKeys.length;
        imageKeys.push(...data.image_keys);
        console.log(imageKeys);
        for(let i=0; i<imageKeys.length; i++){
          if(i<tmp){ continue; }
          imgContainer.innerHTML += `<img class="img-set" id="${i}" src="${baseurl}bucket/media/?key=${imageKeys[i]}" alt="imgset"/>`;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
});

//이미지 요소 및 키 제거
imgContainer.onclick = async function (e) {
  let imgSet = document.querySelectorAll(".img-set");
  console.log(imgSet);
  for(let i=0; i<imgSet.length; i++){
    imgSet[i].onclick = function (e) {
        console.log(e.target.id);
        imageKeys.splice(Number(e.target.id), 1);
        document.getElementById(e.target.id).remove();
        // console.log(imgSet);
        console.log(imageKeys);
    }
  }
}

document.querySelector(".post_btn").onclick = async function (e) {
  let body = {
    body: textArea.value,
    image_keys: imageKeys,
  };
  console.log(body);

  await fetch(`${baseurl}post/`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${idtoken}`,
    },
    body: JSON.stringify(body),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      window.location.href=`./post_pk.html`
    })
    .catch((err) => {
      console.error(err);
    });
};