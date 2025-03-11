import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "~/services/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/util.css";
import "./css/main.css";

const SignUpPage: React.FC = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setError("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("password", password);


    try {
      const response = await axiosInstance.post("/users", formData);

      if (response.data.success) {
        console.log("Sign-Up Successful:", response.data);
        alert("Sign-Up successful!");
        navigate("/");
      } else {
        setError(response.data.message || "Sign-Up failed");
      }
    } catch (error) {
      console.error("Sign-Up failed:", error);
      setError("Sign-Up failed!");
    }
  };


  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt" data-tilt>
            <img src="https://mitly.us/webroot/assets/register/images/img-01.png" alt="Sign-Up Illustration" />
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
                name="name"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-user" aria-hidden="true"></i>
              </span>
            </div>

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
