import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "~/services/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/util.css";
import "./css/main.css";

const SignUpPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
    null
  );
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setError("");

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    try {
      const response = await axiosInstance.post("/users", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        console.log("Sign-Up Successful:", response.data);
        alert("Sign-Up successful!");
        navigate("/login");
      } else {
        setError(response.data.message || "Sign-Up failed");
      }
    } catch (error) {
      console.error("Sign-Up failed:", error);
      setError("Sign-Up failed!");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setProfilePicture(file);
      setProfilePictureUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt" data-tilt>
            <img src="app/routes/images/img-01.png" alt="Sign-Up Illustration" />
          </div>

          <form className="login100-form validate-form" onSubmit={handleSubmit}>
            <span className="login100-form-title">Sign Up</span>

            <div
              className="wrap-input100 validate-input"
              data-validate="Username is required"
            >
              <input
                className="input100"
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-user" aria-hidden="true"></i>
              </span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Confirm Password is required"
            >
              <input
                className="input100"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>

            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

            <div
              className="wrap-input100"
              style={{ marginBottom: "20px", textAlign: "center" }}
            >
              <label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{
                    display: "block",
                    margin: "10px auto",
                    padding: "8px",
                  }}
                />
                {profilePictureUrl && (
                  <img
                    src={profilePictureUrl}
                    alt="Profile Preview"
                    style={{ width: "50%", borderRadius: "50%" }}
                  />
                )}
              </label>
            </div>

            <div className="container-login100-form-btn">
              <button type="submit" className="login100-form-btn">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
