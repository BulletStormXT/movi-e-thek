import React, { useEffect, useState } from "react";

const fetchUserData = () => {
  const token = localStorage.getItem("token");
  return fetch("http://localhost:3001/api/user", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  });
};

const updateUserData = (userId, updates) => {
  const token = localStorage.getItem("token");
  return fetch(`http://localhost:3001/api/user/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  }).then((response) => {
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error(text);
      });
    }
    return response.json();
  });
};

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchUserData()
      .then((data) => {
        setUserData(data);
        setUsername(data.name);
        setEmail(data.email);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserData(userId, { name: username, email: email })
      .then((updatedData) => {
        setUserData(updatedData);
        localStorage.setItem("name", updatedData.name);
        localStorage.setItem("email", updatedData.email);
      })
      .catch((error) => console.error("Error updating user data:", error));
  };

  return (
    <div id="profile-container" className="profile-container">
      {/* <img
        src={userData?.profilePicture}
        alt="Profile"
        className="profile-picture"
      /> */}
      <div className="ppph-frame">
        <div className="ppph">PP</div>
        {/* ~SPACE~ */}
      </div>
      <div className="text-container">
        <p className="username">Username: {localStorage.getItem("name")}</p>
        <p className="email">Email: {localStorage.getItem("email")}</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
