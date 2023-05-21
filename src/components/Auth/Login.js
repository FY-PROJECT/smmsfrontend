import React, { useState,useContext } from "react";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import "../../css/login.css";
import girl from "../../img/login-girl.png";
import alertContext from "../../contexts/Alert/alertContext";
import Alert from "../Alert";

const Login = () => {
  const HOST = "https://smms.onrender.com";
  
  const style = {
    margin: "15px 0",
  };
  const history = useNavigate();

  const context = useContext(alertContext);
  const { showAlert } = context;

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameFocused, setuserNameFocused] = useState(false);
  const [passswordFocused, setPassswordFocused] = useState(false);

  
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    const response = await fetch(`${HOST}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: name, password: password}),
    });
    const res = await response.json();
    if(res.success){
      localStorage.setItem("token", res.authToken);
      history("/");
      showAlert("Login Successful", "success");        
    }else{
      showAlert("Invalid Credentials", "danger");
    }
  };

  return (
    <>
      <div className="login">
        <header id="header" className="fixed-top">
          <div className="container d-flex align-items-center justify-content-between">
            <h1 className="logo">
              <Link to="/l">SMMS</Link>
            </h1>
          </div>
        </header>
        <Alert/>
        <img src={girl} className="girl-logo" alt="" />
        <div className="login-container">
          <div className="title">Login</div>

          <div
            className={`fluid-input ${
              userNameFocused
                ? "fluid-input--focus"
                : name !== ""
                ? "fluid-input--open"
                : ""
            }`}
            style={style}
          >
            <div className="fluid-input-holder">
              <input
                className="fluid-input-input"
                type="text"
                id="userName"
                onFocus={() => setuserNameFocused(!userNameFocused)}
                onBlur={() => setuserNameFocused(!userNameFocused)}
                onChange={handleNameChange}
              />
              <label className="fluid-input-label" htmlFor="userName">
                Name
              </label>
            </div>
          </div>

          <div
            className={`fluid-input ${
              passswordFocused
                ? "fluid-input--focus"
                : password !== ""
                ? "fluid-input--open"
                : ""
            }`}
            style={style}
          >
            <div className="fluid-input-holder">
              <input
                className="fluid-input-input"
                type="password"
                id="password"
                onFocus={() => setPassswordFocused(!passswordFocused)}
                onBlur={() => setPassswordFocused(!passswordFocused)}
                onChange={handlePassChange}
              />
              <label className="fluid-input-label" htmlFor="password">
                Password
              </label>
            </div>
          </div>
          <button className="login-button" onClick={handleLogin}>
            Log In
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
