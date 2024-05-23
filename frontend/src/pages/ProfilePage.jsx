import { useState, useEffect } from "react";
import "../assets/styling.css";

const ProfilePage = () => {
  const userid = localStorage.getItem("userid");
  console.log("userid:", userid);

  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [profilePicture, setProfilePicture] = useState(null);
  const [newProfilePicture, setNewProfilePicture] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`http://localhost:3666/users/${userid}`);
        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
          setUsername(data.username);
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setEmail(data.email);
          setProfilePicture(data.profilePicture);
        } else {
          setError("Failed to fetch profile data");
        }
      } catch (error) {
        setError("Error fetching profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userid]);

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("firstname", firstName);
      formData.append("lastname", lastName);
      formData.append("email", email);
      if (newProfilePicture) {
        formData.append("profilePicture", newProfilePicture);
      } else {
        formData.append("profilePicture", profilePicture);
      }
      if (newPassword) {
        formData.append("password", newPassword);
      }

      const response = await fetch(`http://localhost:3666/users/${userid}`, {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to save changes");
      }

      if (newProfilePicture) {
        setProfilePicture(newProfilePicture);
        setNewProfilePicture(null);
      }

      setError(null);
    } catch (error) {
      setError("Error saving changes");
    }
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match.");
      return;
    }

    setError(null);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setNewProfilePicture(file);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Profile Page</h2>
      {loading && <p>Loading profile data...</p>}
      {error && <p>{error}</p>}
      {profileData && (
        <div className="row">
          <div className="col-md-4">
            <img
              src={
                newProfilePicture
                  ? URL.createObjectURL(newProfilePicture)
                  : profilePicture
              }
              alt="Profile"
              className="img-thumbnail rounded mb-3"
            />
            <div>
              <label
                htmlFor="profile-picture-upload"
                className="btn btn-secondary"
              >
                Datei auswählen
                <input
                  id="profile-picture-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  style={{ display: "none" }}
                />
              </label>
              <input
                type="text"
                readOnly
                className="form-control mt-2"
                value={newProfilePicture ? newProfilePicture.name : ""}
                placeholder="Keine Datei ausgewählt"
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={handleSaveChanges}
              disabled={!username || !firstName || !lastName || !email}
            >
              Save Changes
            </button>
          </div>
          <div className="col-md-8">
            <div className="profile-info">
              <form>
                <div className="mt-3">
                  <strong>Username:</strong>{" "}
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <strong>First Name:</strong>{" "}
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <strong>Last Name:</strong>{" "}
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <strong>Email Address:</strong>{" "}
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mt-3">
                  <button
                    className="btn btn-secondary"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
            <form>
              <div>
                <h4 className="mt-5 mb-4">Change Password</h4>
                <div className="mt-2">
                  <input
                    type="password"
                    placeholder="Enter Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <input
                    type="password"
                    placeholder="Enter New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <input
                    type="password"
                    placeholder="Repeat New Password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-primary password-change mt-3"
                  onClick={handleChangePassword}
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
