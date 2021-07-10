import React from "react";
import Handle_api from "../Apis/Handle_api";

import "../Design/LoginandSignupPage.css";

const LoginPage = () => {
  //console.log(props.isLogin); isLogin is 1 for login and 0 for signup
  const handle_login = (event) => {
    let email = event.target.Email.value.toString();
    let password = event.target.Password.value.toString();
    event.preventDefault();
    /* Handle_api("GET", "/", {}).then((response) => {
      console.log(response);
    });*/

    Handle_api("POST", "/Login", {
      email: email,
      password: password,
    })
      .then((response) => {
        console.log(response);
        if (response.loggedIn == true) {
          localStorage.clear();
          localStorage.setItem("data", JSON.stringify(response.data)); //response.data.data will have all the details;
          window.location.reload();
        } else {
          console.log(response.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="LoginPage">
      <div>Please fill in the following details to Login</div>
      <div className="credentials">
        <form onSubmit={handle_login}>
          <input name="Email" placeholder="Enter Your Email" />
          <input name="Password" placeholder="Enter Your Password" />
          <button>LOGIN</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
