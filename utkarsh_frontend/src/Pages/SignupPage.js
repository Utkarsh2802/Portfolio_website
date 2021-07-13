import React from "react";
import Handle_api from "../Apis/Handle_api";
import "../Design/LoginandSignupPage.css";

const SignupPage = () => {
  //console.log(props.isLogin); isLogin is 1 for login and 0 for signup
  const handle_signup = (event) => {
    event.preventDefault();
    let username = event.target.Username.value.toString();
    let email = event.target.Email.value.toString();
    let password = event.target.Password.value.toString();
    let data = {
      username: username,
      password: password,
      email: email,
    };
    Handle_api("POST", "/Signup", data)
      .then((response) => {
        // i already return response.data so i can now directly to response.status this status variable is created by me , i am not using the status http status codes
        console.log(response.status);
      })
      .catch((error) => {
        console.log("Theres some error");
        console.log(error);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        height: "93vh",
        justifyContent: "space-evenly",
        flexDirection: "column",
      }}
    >
      <div className="SignupPage">
        <div className="loginsignupheading">
          We are elated to have you join us !!
        </div>

        <form className="signupcredentials" onSubmit={handle_signup}>
          <input
            className="inputfield"
            name="Username"
            placeholder="Username"
          />

          <input className="inputfield" name="Email" placeholder="Email" />

          <input
            className="inputfield"
            name="Password"
            placeholder="Password"
            type="password"
          />
          <button className="loginsignupbutton"> SIGNUP</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
