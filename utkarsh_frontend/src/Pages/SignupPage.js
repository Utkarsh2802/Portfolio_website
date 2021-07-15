import React, { useState, useContext } from "react";
import Handle_api from "../Apis/Handle_api";
import { useHistory } from "react-router";
import "../Design/LoginandSignupPage.css";
import Footer from "../Components/Footer";
const SignupPage = () => {
  let history = useHistory();
  const [showerror, setShowerror] = useState("");
  //console.log(props.isLogin); isLogin is 1 for login and 0 for signup
  const [cursor, setCursor] = useState("default");
  const handle_signup = (event) => {
    event.preventDefault();
    var mailvalidation =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/; //regexp doesnt need double quotes
    if (!mailvalidation.test(event.target.Email.value.toString())) {
      setShowerror("Please enter a valid email");
      return;
    }
    setCursor("wait");
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
        //console.log(response.status);

        setCursor("default");
        history.push("/Loginnewsignup"); //so that i can redirect the new user to the login page and at the same time i can show him a message that he has successfully signed up
        //later on i can simply add on this feature to include email verification
      })
      .catch((error) => {
        //console.log(error);
        setCursor("default");
      });
  };

  return (
    <div
      style={{
        cursor: cursor,
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
          {showerror == "" ? (
            ""
          ) : (
            <div style={{ color: "red", fontSize: "2.5vh" }}>{showerror}</div>
          )}
          <button className="loginsignupbutton"> SIGNUP</button>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default SignupPage;
