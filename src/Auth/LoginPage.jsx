import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import Login from "../Assets/Login.jpg";
import "../Styles/Auth.css";
import Logo from "../Assets/Logo";

function LoginPage() {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = await fetch("https://miniyt-backend.onrender.com/user/log", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    data = await data.json();
    if (data.message === "success") {
      toast.success("log in successful");
      localStorage.setItem("user", JSON.stringify(data.data));
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      toast.error("wrong credentials");
    }
  };

  const handleSuccess = async (credentialResponse) => {
    try {
      let res = await fetch("https://miniyt-backend.onrender.com/user/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      let data = await res.json();

      if (data.message === "success" && data.data) {
        toast.success("Google login successful 🎉");
        localStorage.setItem("user", JSON.stringify(data.data));
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        toast.error("Google login failed ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const handleError = () => {
    toast.error("Login failed");
  };
  return (
    <>
      <div className="containerAuth">
        <div className="boxAuth1">
          <div id="l">
            <Logo/>
          </div>
          <p>Get Started</p>
          <h2>Welcome to miniYT</h2>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSubmit}>Log in</button>
          <p id="sign">
            don't have an account <Link to="/sign">sign up</Link>{" "}
          </p>
          <p id="or">or</p>
          <p>
            <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
          </p>
        </div>
        <div className="boxAuth2">
          <img src={Login} alt="img" />
        </div>
      </div>
    </>
  );
}

export default LoginPage;
