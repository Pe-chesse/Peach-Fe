import oAuth from "./providers/oauth.js";
import { userInfo } from "./providers/oauth.js";
import User from "./models/user.js";

async function basic() {
  await oAuth();
  if (userInfo) {
    document
      .querySelector(".tab-menu-profile a")
      .setAttribute("href", `./my_profile.html?nickname=${userInfo.nickname}`);
  }
  const tabMenuElements = document.querySelectorAll(".tab-menu-elements li");

  tabMenuElements.forEach((element) => {
    element.addEventListener("click", () => {
      console.log(element);
      tabMenuElements.forEach((otherElement) => {
        otherElement.classList.remove("on");
      });
      element.classList.add("on");
    });
  });
}
basic();

// function tabProfile() {
//   const findProfile = async () => {
//     const result = await fetch(`${baseurl}api/v1/account/verify/`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${idtoken}`,
//       },
//     })
//       .then((res) => {
//         return res.json();
//       })
//       .then((res) => {
//         const nickname = res.nickname;
//
//       });
//   };
//   findProfile();
// }
// tabProfile();
