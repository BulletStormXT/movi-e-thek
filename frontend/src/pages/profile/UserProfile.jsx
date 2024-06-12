import React, { useEffect, useState } from "react";

const fetchUserData = () => {
  return fetch("user", {
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  }).then((response) => response.json());
};

const UserProfile = () => {
  const [setUserData] = useState(null);

  useEffect(() => {
    fetchUserData()
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

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
