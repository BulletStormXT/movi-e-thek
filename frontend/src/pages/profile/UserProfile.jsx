import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker"; // npm install react-datepicker date-fns
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from "date-fns"; // npm install date-fns

const phonePrefixes = [
  { country: "Germany", prefix: "+49(0)" },
  { country: "Hell", prefix: "+666(0)" },
  { country: "Heaven", prefix: "+777(0)" },
  { country: "Afghanistan", prefix: "+93(0)" },
  { country: "Albania", prefix: "+355(0)" },
  { country: "Algeria", prefix: "+213(0)" },
  { country: "Andorra", prefix: "+376(0)" },
  { country: "Spain", prefix: "+34(0)" },
  { country: "United States", prefix: "+1(0)" },
  { country: "United Kingdom", prefix: "+44(0)" },
  { country: "France", prefix: "+33(0)" },
  { country: "Italy", prefix: "+39(0)" },
  { country: "Japan", prefix: "+81(0)" },
  { country: "China", prefix: "+86(0)" },
  { country: "Russia", prefix: "+7(0)" },
  { country: "Brazil", prefix: "+55(0)" },
  { country: "India", prefix: "+91(0)" },
  { country: "Norway", prefix: "+47(0)" },
  { country: "Sweden", prefix: "+46(0)" },
  { country: "Finland", prefix: "+358(0)" },
  { country: "Denmark", prefix: "+45(0)" },
  { country: "Netherlands", prefix: "+31(0)" },
  { country: "Belgium", prefix: "+32(0)" },
  { country: "Luxembourg", prefix: "+352(0)" },
  { country: "Switzerland", prefix: "+41(0)" },
  { country: "Austria", prefix: "+43(0)" },
  { country: "Poland", prefix: "+48(0)" },
  { country: "Czech Republic", prefix: "+420(0)" },
  { country: "Slovakia", prefix: "+421(0)" },
  { country: "Hungary", prefix: "+36(0)" },
  { country: "Croatia", prefix: "+385(0)" },
  { country: "Slovenia", prefix: "+386(0)" },
  { country: "Bosnia", prefix: "+387(0)" },
  { country: "Herzegovina", prefix: "+387(0)" },
  { country: "Montenegro", prefix: "+382(0)" },
  { country: "Bikini Bottom", prefix: "+123(0)" },
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
  const [formData, setFormData] = useState({
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    profilePicture: "",
    phone: "",
    birthDate: null,
    selectedPrefix: "",
  });

  // Fetch user data when component mounts
  useEffect(() => {
    fetchUserData()
      .then((data) => {
        setUserData(data);
        setFormData({
          name: data.name || "",
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          profilePicture: data.profilePicture || "",
          phone: data.phone || "",
          birthDate: data.birthDate ? parseISO(data.birthDate) : null,
          selectedPrefix: "",
        });
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, birthDate: date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedBirthDate = formData.birthDate
      ? format(formData.birthDate, "yyyy-MM-dd")
      : "";
    updateUserData(userData._id, {
      ...formData,
      phone: `${formData.selectedPrefix}${formData.phone}`,
      birthDate: formattedBirthDate,
    })
      .then((updatedData) => {
        setUserData(updatedData);
        localStorage.setItem("userData", JSON.stringify(updatedData));
      })
      .catch((error) => console.error("Error updating user data:", error));
  };

  const handleCancel = () => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        profilePicture: userData.profilePicture || "",
        phone: userData.phone || "",
        birthDate: userData.birthDate ? parseISO(userData.birthDate) : null,
        selectedPrefix: "",
      });
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container-l left-container">
        <div className="profImgI">
          <div className="profile-wrapper-t">
            <div className="profile-image">
              {userData.profilePicture ? (
                <img src={userData.profilePicture} alt="Profile" />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "15px",
                  }}
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
        </div>
        <div className="user-info">
          <table className="invisible-table">
            <tbody>
              <tr>
                <td>
                  <strong>Username:</strong>
                </td>
                <td>{userData.name}</td>
              </tr>
              <tr>
                <td>
                  <strong>First Name:&nbsp; &nbsp;</strong>
                </td>
                <td>{userData.firstName}</td>
              </tr>
              <tr>
                <td>
                  <strong>Last Name:</strong>
                </td>
                <td>{userData.lastName}</td>
              </tr>
              <tr>
                <td>
                  <strong>Email:</strong>
                </td>
                <td>{userData.email}</td>
              </tr>
              <tr>
                <td>
                  <strong>Phone:</strong>
                </td>
                <td>{`${formData.selectedPrefix} ${userData.phone}`}</td>
              </tr>
              <tr>
                <td>
                  <strong>Birth Date:</strong>
                </td>
                <td>
                  {userData.birthDate
                    ? format(parseISO(userData.birthDate), "dd/MM/yyyy")
                    : "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="profile-wrapper-b">
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
      </div>
      <div className="profile-container-r right-container">
        <div className="update-info">
          <h2>Update your Information</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label htmlFor="name">Username:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="profilePicture">Profile Picture:</label>
                <input
                  type="text"
                  id="profilePicture"
                  name="profilePicture"
                  value={formData.profilePicture}
                  onChange={handleChange}
                />
              </div>
              <div className="phone-coantainer">
                <label htmlFor="phone">Phone Number:</label>
                <div className="phone-input">
                  <select
                    id="phonePrefix"
                    name="selectedPrefix"
                    value={formData.selectedPrefix}
                    onChange={handleChange}
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
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="birthDate">Birth Date:</label>
                <DatePicker
                  id="birthDate"
                  selected={formData.birthDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd/MM/yyyy"
                  showMonthDropdown
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={200}
                />
              </div>
              <div className="change-button">
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
