import React from "react";
import Handle_api from "../Apis/Handle_api";
import axios from "axios";
import "../Design/LoginPage.css";
const LoginPage = () => {
  const handle_login = (event) => {
    let email = event.target.Email.value.toString();
    let password = event.target.Password.value.toString();
    event.preventDefault();
    /* Handle_api("GET", "/", {}).then((response) => {
      console.log(response);
    });*/
    let hello = "sdf";
    const variable = Handle_api("POST", "/Login", {
      email: email,
      password: password,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="LoginPage">
      <div style={{ color: "white" }}>Welcome to the Login Page</div>

      <form onSubmit={handle_login}>
        <input name="Email" placeholder="Enter Your Email" />
        <input name="Password" placeholder="Enter Your Password" />
        <button>LOGIN</button>
      </form>
    </div>
  );
};

export default LoginPage;
