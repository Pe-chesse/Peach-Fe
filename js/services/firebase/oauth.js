import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
const app = initializeApp(firebaseConfig);
const button = document.querySelector("#google-sign-in");

const provider = new GoogleAuthProvider();
const auth = getAuth(app);
button.addEventListener("click", async () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
    })
    .catch((error) => {
      // Handle Errors here.
      console.log(error);
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(credential);
    });
});
