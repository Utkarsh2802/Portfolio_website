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
    if (email === "" || password === "") {
      alert("Email and Password can't be empty Please try again!"); //remeber to add proper validations and make changes to the ui accordingly
      return;
    }
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
          Welcome Back Future Typing God!!
        </div>

        <form className="signupcredentials" onSubmit={handle_login}>
          <input className="inputfield" name="Email" placeholder="Email" />

          <input
            className="inputfield"
            name="Password"
            placeholder="Password"
            type="password"
          />
          <button
            style={{
              marginTop: "4vh",
              backgroundImage: " linear-gradient(to right, #a330b8, #158897)",
              color: "white",
            }}
          >
            {" "}
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
