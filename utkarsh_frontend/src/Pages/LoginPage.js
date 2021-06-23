import React, { useState } from "react";
import Handle_api from "../Apis/Handle_api";
import axios from "axios";
import "../Design/LoginPage.css";

const LoginPage = (props) => {
  const [islogin, setIsLogin] = useState(props.isLogin); //decides whether to display login page or signup page to make it faster i am not creating two separate paages rather i am just gonna use conditional rendering
  const formref = React.useRef(null);
  //console.log(props.isLogin); isLogin is 1 for login and 0 for signup
  const handle_login = (event) => {
    let email = event.target.Email.value.toString();
    let password = event.target.Password.value.toString();
    event.preventDefault();
    /* Handle_api("GET", "/", {}).then((response) => {
      console.log(response);
    });*/
    let hello = "sdf";
    Handle_api("POST", "/Login", {
      email: email,
      password: password,
    }).then((response) => {
      console.log(response);
    });
  };

  const handle_signup = (event) => {
    event.preventDefault();
    let username = formref.current.Username.value;
    let email = formref.current.Email.value;
    let password = formref.current.Password.value;
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
    <div className="LoginPage">
      <div style={{ color: "white" }}>
        Please fill in the following details to{" "}
        {props.isLogin ? "Login" : "SignUp"}
      </div>

      <form ref={formref} onSubmit={handle_login}>
        {props.isLogin ? (
          ""
        ) : (
          <input name="Username" placeholder="Enter your Username" />
        )}
        <input name="Email" placeholder="Enter Your Email" />

        <input name="Password" placeholder="Enter Your Password" />
        {!props.isLogin ? "" : <button>LOGIN</button>}
      </form>
      {!props.isLogin ? <button onClick={handle_signup}> SIGNUP</button> : ""}
    </div>
  );
};

export default LoginPage;
