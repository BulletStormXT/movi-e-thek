import { userProfileCSS } from "./UserProfile.css.js";

const injectCSS = (cssString) => {
  const styleElement = document.createElement("style");
  styleElement.textContent = cssString;
  document.head.appendChild(styleElement);
};

injectCSS(userProfileCSS);

const fetchUserData = () => {
  fetch("user", {
    method: "GET",
    header: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  })
    .then((response) => response.json())
    .then((data) => {
      renderUserProfile(data);
    })
    .catch((error) => console.error("Error fetching User Data:", error));
};

const renderUserProfile = (userData) => {
  const profilePicture = document.createElement("img");
  profilePicture.src = userData.profilePicture;

  const username = document.createElement("h2");
  username.textContent = userData.username;

  const email = document.createElement("p");
  email.textContent = userData.email;

  const profileContainer = document.getElementById("profile-container");
  profileContainer.appendChild(profilePicture);
  profileContainer.appendChild(username);
  profileContainer.appendChild(email);
};

window.addEventListener("load", fetchUserData);

export default userProfileCSS;
