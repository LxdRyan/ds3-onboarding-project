import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/util.css";
import "./css/main.css";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.get("/auth/login", {});
      console.log(response.data);

      if (response.data.success) {
        console.log("Login Successful:", response.data);
        alert("Login successful!");
        navigate("/"); // Navigate to the homepage
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed!");
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt" data-tilt>
            <img src="https://mitly.us/webroot/assets/register/images/img-01.png" alt="Login Illustration" />
          </div>

          <form className="login100-form validate-form" onSubmit={handleSubmit}>
            <span className="login100-form-title">Member Login</span>

            <div
              className="wrap-input100 validate-input"
              data-validate="Valid username is required"
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

            <div className="container-login100-form-btn">
              <button type="submit" className="login100-form-btn">
                Login
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
                onClick={handleSignUp}
              >
                Create your Account
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

export default LoginPage;
