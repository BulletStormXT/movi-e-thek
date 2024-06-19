import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker"; // npm install react-datepicker date-fns
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from "date-fns"; // npm install date-fns

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
  /* const [username, setUsername] = useState(""); */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchUserData()
      .then((data) => {
        setUserData(data);
        /* setUsername(data.name);
        setEmail(data.email); */
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        setPhone(data.phone);
        setBirthDate(data.birthDate ? parseISO(data.birthDate) : null);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    /* updateUserData(userId, { name: username, email: email }) */
    const formattedBirthDate = birthDate ? format(birthDate, "yyyy-MM-dd") : "";
    updateUserData(userId, {
      firstName,
      lastName,
      email,
      phone,
      birthDate: formattedBirthDate,
    })
      .then((updatedData) => {
        setUserData(updatedData);
        /* localStorage.setItem("name", updatedData.name);
        localStorage.setItem("email", updatedData.email); */
        localStorage.setItem("firstName", updatedData.firstName);
        localStorage.setItem("lastName", updatedData.lastName);
        localStorage.setItem("email", updatedData.email);
        localStorage.setItem("phone", updatedData.phone);
        localStorage.setItem("birthDate", updatedData.birthDate);
      })
      .catch((error) => console.error("Error updating user data:", error));
  };

  /* return (
    <div id="profile-container" className="profile-container">
      <div className="ppph-frame">
        <div className="ppph">PP</div>
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
  ); */

  return (
    <div className="profile-page">
      <div className="profile-container left-container">
        <div className="profile-image">
          <img src={userData?.profilePicture} alt="Profile" />
        </div>
        <div className="profile-info">
          <h2>
            {userData?.firstName} {userData?.lastName}
          </h2>
        </div>
        <div className="profile-links">
          <ul>
            <li>
              <a href="#orders">My Orders</a>
            </li>
            <li>
              <a href="#wallet">My Wallet</a>
            </li>
            <li>
              <a href="#settings">Settings</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="profile-container right-container">
        <h2>Personal Information</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
          <div>
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="birthDate">Birth Date:</label>
            <DatePicker
              id="birthDate"
              selected={birthDate}
              onChange={(date) => setBirthDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/MM/yyyy"
            />
          </div>
          <button type="submit">Save</button>
          <button type="button">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
