import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "~/services/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/util.css"; // Matching styles from the signup page
import "./css/main.css";

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(""); // Add state variable for user ID

  // Fetch profile details on component mount
  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        const response = await axiosInstance.get("/auth/profile");
        const user = await axiosInstance.get(`/users/${response.data.contents}`);
        const profile = user.data.contents;

        setName(profile.name);
        setUsername(profile.username);
        setUserId(profile.id); 
      } catch (error) {
        console.error("Failed to fetch profile details:", error);
        alert("Unable to fetch profile details");
      }
    };

    fetchProfileDetails();
  }, []);

  const handleUpdate = async () => {
    try {
      const updatedProfile = { name };

      await axiosInstance.put(`/users/${userId}`, updatedProfile);
      alert("Username updated successfully");
      navigate("/home");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await axiosInstance.delete(`/users/${userId}`); // Use the user ID in the delete request
      alert("Account deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Failed to delete account:", error);
      alert("Failed to delete account");
    }
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <form className="add100-form validate-form">
            <span className="login100-form-title">Profile</span>
            <label htmlFor="name">Name:</label>
            <div className="wrap-input100">

              <input
                id="name"
                className="input100"
                type="text"
                value={username}
                placeholder="Username"
                readOnly
              />
              <span className="focus-input100"></span>
            </div>
            <label htmlFor="username">Username:</label>
            <div
              className="wrap-input100 validate-input"
              data-validate="Name is required"
            >

              <input
                id="username"
                className="input100"
                type="text"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <span className="focus-input100"></span>
            </div>

            <div className="container-login100-form-btn">
              <button
                type="button"
                onClick={handleUpdate}
                className="login100-form-btn"
              >
                Update Username
              </button>
            </div>

            <div className="container-login100-form-btn mt-2">
              <button
                type="button"
                onClick={handleDeleteAccount}
                className="login100-form-btn"
                style={{ backgroundColor: "#dc3545" }}
              >
                Delete Account
              </button>
            </div>

            <div className="text-center p-t-136">
              <button
                type="button"
                className="txt2"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: "#007BFF",
                }}
                onClick={() => navigate("/home")}
              >
                Back to Home
                <i
                  className="fa fa-long-arrow-right m-l-5"
                  aria-hidden="true"
                ></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
