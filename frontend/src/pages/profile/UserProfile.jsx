import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker"; // npm install react-datepicker date-fns
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from "date-fns"; // npm install date-fns

const phonePrefixes = [
  { country: "Germany", prefix: "+49 (0)" },
  { country: "Hell", prefix: "+666 (0)" },
  { country: "Heaven", prefix: "+777 (0)" },
];

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
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState(null);

  const [selectedPrefix, setSelectedPrefix] = useState("");

  // Fetch user data when component mounts
  useEffect(() => {
    fetchUserData()
      .then((data) => {
        setUserData(data);
        // Set initial form values from fetched data
        setName(data.name || "");
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
      name,
      firstName,
      lastName,
      email,
      phone: `${selectedPrefix}${phone}`,
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
      <div className="profile-container-l left-container">
        <div className="profImgI">
          <div className="profile-image">
            {userData.profilePicture ? (
              <img src={userData.profilePicture} alt="Profile" />
            ) : (
              <div
                style={{ width: "100%", height: "100%", borderRadius: "15px" }}
              >
                <span>Profile Picture Placeholder</span>
              </div>
            )}
          </div>
          <div className="profile-info">
            <h2>
              {userData.firstName} {userData.lastName}
            </h2>
          </div>
        </div>
        <div className="profile-links">
          <ul>
            <li className="profile-link">
              <a href="#orders">My Orders</a>
            </li>
            <li className="profile-link">
              <a href="#settings">Wishlist</a>
            </li>
            <li className="profile-link">
              <a href="#wallet">My Wallet</a>
            </li>
            <li className="profile-link">
              <a href="#settings">Settings</a>
            </li>
            <li className="profile-link">
              <a href="#settings">Support</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="profile-container-r right-container">
        <div className="user-info">
          <h2>Personal Information</h2>
          <p>
            <strong>Username:</strong> {userData.name}
          </p>
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
            <strong>Phone:</strong> {`${selectedPrefix} ${phone}`}
          </p>
          <p>
            <strong>Birth Date:</strong>{" "}
            {birthDate ? format(birthDate, "dd/MM/yyyy") : "N/A"}
          </p>
        </div>
        <div className="update-info">
          <h2>Update Information</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Username:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
              <div className="phone-coantainer">
                <label htmlFor="phone">Phone Number:</label>
                <div className="phone-input">
                  <select
                    id="phonePrefix"
                    value={selectedPrefix}
                    onChange={(e) => setSelectedPrefix(e.target.value)}
                  >
                    {phonePrefixes.map((prefix, index) => (
                      <option key={index} value={prefix.prefix}>
                        {prefix.country}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
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
              <div className="change-button">
                <button type="submit">Save</button>
                <button type="button">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
