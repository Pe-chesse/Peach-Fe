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
const profileImg = document.querySelector("#profile-img");
const profileImgRenderer = document.querySelector("#profile-img-renderer");
let imageKey;
let idtoken;

onAuthStateChanged(auth, async (user)=>{
  if(user){
    idtoken = await user.getIdToken();
  }
})

profileImg.addEventListener("change", async (event) => {
  const selectedFile = event.target.files[0];

  const formData = new FormData();
  formData.append("files", selectedFile);

  if (selectedFile) {
    const result = await fetch(`${baseurl}bucket/media/`, {
      method: "POST",
      headers: {
          Authorization: `bearer ${idtoken}`,
      },
      body: formData,
    })
      .then(async (res) => {
        const data = await res.json();
        imageKey = data.image_keys[0];
        console.log(imageKey);
        profileImgRenderer.src = `${baseurl}bucket/media/?key=${imageKey}`;
      })
      .catch((err) => {
        console.error(err);
      });
  }
});

document.querySelector(".start-btn").onclick = async function (e) {
  const profileNickname = document.querySelector("#nickname");
  const profileIntroduce = document.querySelector("#introduce");
  console.log(profileImg.value);
  console.log(profileNickname.value);
  console.log(profileIntroduce.value);
  let body = {
    nickname: profileNickname.value,
    description: profileIntroduce.value,
  };
  if (profileImg != null) {
    body.image_key = imageKey;
  }
  console.log('body: ' + body);

  await fetch(`${baseurl}account/profile/`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${idtoken}`,
    },
    body: JSON.stringify(body),
  })
    .then( async (res) => {
      await fetch(`${baseurl}account/verify/`,{
        method : "GET",
        headers: {
          Authorization: `bearer ${idtoken}`
        }
      })
      .then((res)=>{
        return res.json()
      })
      .then((res)=>{
        console.log(res)
        window.sessionStorage.setItem('personalInfo',JSON.stringify(res))
        window.location.href="./homepage.html"
      })
      .cathc((err)=>{
        console.log(err)
      })
    })
    .catch((err) => {
      console.error(err);
    });
};


