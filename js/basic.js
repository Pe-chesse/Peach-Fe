import oAuth from "./providers/oauth.js";
import { userInfo } from "./providers/oauth.js";
import { getUser } from "./services/ws.js";

async function basic() {
  await oAuth();
  if (userInfo) {
    getUser();
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
