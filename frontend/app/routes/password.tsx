import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "~/services/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/util.css";
import "./css/main.css";

const ForgotPasswordPage: React.FC = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("username", username);
    formData.append("name", name);
    formData.append("password", password);

    try {
      const id = await axiosInstance.get('/auth/profile')
      const response = await axiosInstance.put(`/users/${id}/password`, formData);

      if (response.data.success) {
        console.log("Password Changed:", response.data);
        setSuccess("Password Changed Successfully!");
        navigate("/");
      } else {
        setError(response.data.message || "Try Again");
      }
    } catch (error) {
      console.error("Try Again:", error);
      setError("Try Again!");
    }
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt" data-tilt>
            <img src="https://mitly.us/webroot/assets/register/images/img-01.png" alt="Forgot Password Illustration" />
          </div>

          <form className="login100-form validate-form" onSubmit={handleSubmit}>
            <span className="login100-form-title">Forgot Password</span>

            <div className="wrap-input100 validate-input" data-validate="Name is required">
              <input
                className="input100"
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-user" aria-hidden="true"></i>
              </span>
            </div>

            <div className="wrap-input100 validate-input" data-validate="Username is required">
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

            <div className="wrap-input100 validate-input" data-validate="Password is required">
              <input
                className="input100"
                type="password"
                name="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>

            <div className="wrap-input100 validate-input" data-validate="Confirm Password is required">
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
            {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}

            <div className="container-login100-form-btn">
              <button type="submit" className="login100-form-btn">
                Reset Password
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
                onClick={() => navigate("/")}
              >
                Back to Login
                <i className="fa fa-long-arrow-left m-l-5" aria-hidden="true"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
