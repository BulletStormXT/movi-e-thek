import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker"; // npm install react-datepicker date-fns
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from "date-fns"; // npm install date-fns

const fetchUserData = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage
  return fetch(`http://localhost:3001/api/user/${userId}`, {
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState(null);

  // Fetch user data when component mounts
  useEffect(() => {
    fetchUserData()
      .then((data) => {
        setUserData(data);
        // Set initial form values from fetched data
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setBirthDate(data.birthDate ? parseISO(data.birthDate) : null);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Format birthDate if it exists
    const formattedBirthDate = birthDate ? format(birthDate, "yyyy-MM-dd") : "";
    // Update user data
    updateUserData(userData._id, {
      firstName,
      lastName,
      email,
      phone,
      birthDate: formattedBirthDate,
    })
      .then((updatedData) => {
        setUserData(updatedData);
        // Update local storage with updated user data
        localStorage.setItem("userData", JSON.stringify(updatedData));
      })
      .catch((error) => console.error("Error updating user data:", error));
  };

  // Conditional rendering to avoid displaying userData when it's null
  if (!userData) {
    return <div>Loading...</div>; // You can customize this loading indicator
  }

  return (
    <div className="profile-page">
      <div className="profile-container left-container">
        <div className="profile-image">
          <img src={userData.profilePicture} alt="Profile" />
        </div>
        <div className="profile-info">
          <h2>
            {userData.firstName} {userData.lastName}
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
        <div className="user-info">
          <p>
            <strong>First Name:</strong> {firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {lastName}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Phone:</strong> {phone}
          </p>
          <p>
            <strong>Birth Date:</strong>{" "}
            {birthDate ? format(birthDate, "dd/MM/yyyy") : "N/A"}
          </p>
        </div>
        <h2>Update Information</h2>
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
