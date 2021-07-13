import React, { useState } from "react";
import Handle_api from "../Apis/Handle_api";
import "../Design/LoginandSignupPage.css";
import { useHistory } from "react-router";
const LoginPage = () => {
  const [showerror, setShowerror] = useState("");
  //console.log(props.isLogin); isLogin is 1 for login and 0 for signup
  let history = useHistory();
  const handle_login = (event) => {
    let email = event.target.Email.value.toString();
    let password = event.target.Password.value.toString();
    event.preventDefault();
    /* Handle_api("GET", "/", {}).then((response) => {
      console.log(response);
    });*/
    var mailvalidation =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/; //regexp doesnt need double quotes
    if (!mailvalidation.test(email) && email != "demo.com" && password != "g") {
      setShowerror("Invalid Credentials!");
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
          history.push("/Home");
          window.location.reload();
        } else {
          setShowerror(response.message);
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
            className={"inputfield passwordfield"}
            name="Password"
            placeholder="Password"
            type="text"
          />
          {showerror === "" ? (
            ""
          ) : (
            <div style={{ color: "red", fontSize: "2.5vh" }}>{showerror}</div>
          )}
          <button className="loginsignupbutton">LOGIN</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
