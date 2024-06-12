import React, { useEffect, useState } from "react";
/* import { userProfileCSS } from "./UserProfile.css.jsx"; */

/* const injectCSS = (cssString) => {
  const styleElement = document.createElement("style");
  styleElement.textContent = cssString;
  document.head.appendChild(styleElement);
}; */

const fetchUserData = () => {
  return fetch("user", {
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  }).then((response) => response.json());
};

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    /* injectCSS(userProfileCSS); */

    fetchUserData()
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  /* if (!userData) {
    return <div>Loading...</div>;
  } */

  return (
    <div id="profile-container" className="profile-container">
      {/* <img
        src={userData.profilePicture}
        alt="Profile"
        className="profile-picture"
      />*/}
      <div className="ppph-frame">
        <div className="ppph">PP</div>
      </div>
      {/*~SPACE~*/}
      <div className="text-container">
        <p className="username">Username: {localStorage.getItem("name")}</p>
        <p className="email">Email: {localStorage.getItem("email")}</p>
      </div>
    </div>
  );
};

export default UserProfile;
