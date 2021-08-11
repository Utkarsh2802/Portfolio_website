import React, { useState, useContext } from "react";
import HandleApi from "../Apis/HandleApi";
import "../Design/LoginandSignupPage.css";
import { useHistory, Redirect } from "react-router";
import { UserContext } from "../GlobalContexts.js/UserContext";
import Footer from "../Components/Footer";
import LeaderboardFormatter from "../Helpers/LeaderboardFormatter";
import useWindowDimensions from "../Utility_functions/UseWIndowDimensions";
const LoginPage = (props) => {
  document.body.style.overflow = "hidden";
  const { height, width } = useWindowDimensions();
  const [isPhone, setIsPhone] = useState(false);
  if ((width < 1000 && height < 500) || width < 700) {
    document.body.style.overflowY = "scroll";
    document.body.style.overflowX = "hidden";
    if (isPhone == false) setIsPhone(true);
  }
  const [showerror, setShowerror] = useState("");
  const { loggedIn, setLoggedIn } = useContext(UserContext);
  const [showSpinner, setShowSpinner] = useState(false);
  const [cursor, setCursor] = useState("default");
  //console.log(props.isLogin); isLogin is 1 for login and 0 for signup
  let history = useHistory();
  const handleLogin = (event) => {
    let email = event.target.Email.value.toString();
    let password = event.target.Password.value.toString();
    event.preventDefault();
    /* HandleApi("GET", "/", {}).then((response) => {
      console.log(response);
    });*/
    // setCursor("wait");
    setShowSpinner(true);
    var mailValidation =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/; //regexp doesnt need double quotes
    if (!mailValidation.test(email) && email != "demo.com" && password != "g") {
      setShowerror("Invalid Credentials!");
      setShowSpinner(false);
      return;
    }
    HandleApi("POST", "/Login", {
      email: email,
      password: password,
    })
      .then((response) => {
        //setCursor("default");
        setShowSpinner(false);
        //console.log(response);
        //console.log("utksd");
        if (response.loggedIn == true) {
          localStorage.clear();
          localStorage.setItem("data", JSON.stringify(response)); //response.data.data will have all the details;
          localStorage.setItem("verifier", response.verifier);
          //console.log(response.verifier);
          setLoggedIn(() => {
            const [something, userdata] = LeaderboardFormatter();
            //console.log(userdata);
            return true;
          });
          //console.log(loggedIn);
          history.push("/Home");
          // window.location.href = "/Home";
          //return <Redirect to="/Home"></Redirect>; this line didnt work check on it later for why?
          // window.location.reload();
        } else {
          setShowerror(response.message);
        }
      })
      .catch((error) => {
        //setCursor("default");
        setShowSpinner(false);
        console.log(error.message);
      });
  };

  return (
    <div
      style={{
        // cursor: cursor,
        display: "flex",
        height: "93vh",
        justifyContent: "space-evenly",
        flexDirection: "column",
      }}
    >
      <div className="SignupPage">
        <div className="login-sign-up-heading">
          Welcome {props.newsignup != null ? "Our New" : "Back"} Future Typing
          God!!
        </div>

        <form className="sign-up-credentials" onSubmit={handleLogin}>
          <input
            className="input-field"
            name="Email"
            placeholder="Email"
            autoComplete="off"
          />

          <input
            className={"input-field password-field"}
            name="Password"
            placeholder="Password"
            type="text"
            autoComplete="off"
          />
          {showerror === "" ? (
            props.newsignup != null ? (
              <div style={{ color: "green", fontSize: "2.1vh" }}>
                You have successfully SignedUp Login to use you newly created
                account
              </div>
            ) : (
              ""
            )
          ) : (
            <div style={{ color: "red", fontSize: "2.5vh" }}>{showerror}</div>
          )}

          <button className="login-signup-button">LOGIN</button>
        </form>
      </div>
      <Footer height={isPhone ? "92vmax" : "92vh"}></Footer>
      {showSpinner == true ? <div className="spinner"></div> : ""}
    </div>
  );
};

export default LoginPage;
