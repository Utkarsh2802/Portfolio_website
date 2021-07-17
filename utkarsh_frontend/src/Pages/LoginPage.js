import React, { useState, useContext } from "react";
import Handle_api from "../Apis/Handle_api";
import "../Design/LoginandSignupPage.css";
import { useHistory, Redirect } from "react-router";
import { UserContext } from "../GlobalContexts.js/UserContext";
import Footer from "../Components/Footer";
import LeaderboardFormatter from "../Helpers/LeaderboardFormatter";
const LoginPage = (props) => {
  const [showerror, setShowerror] = useState("");
  const { loggedIn, setLoggedIn } = useContext(UserContext);
  const [showSpinner, setShowSpinner] = useState(false);
  const [cursor, setCursor] = useState("default");
  //console.log(props.isLogin); isLogin is 1 for login and 0 for signup
  let history = useHistory();
  const handle_login = (event) => {
    let email = event.target.Email.value.toString();
    let password = event.target.Password.value.toString();
    event.preventDefault();
    /* Handle_api("GET", "/", {}).then((response) => {
      console.log(response);
    });*/
    // setCursor("wait");
    setShowSpinner(true);
    var mailvalidation =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/; //regexp doesnt need double quotes
    if (!mailvalidation.test(email) && email != "demo.com" && password != "g") {
      setShowerror("Invalid Credentials!");
      setShowSpinner(false);
      return;
    }
    Handle_api("POST", "/Login", {
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
          setLoggedIn(() => {
            const [something, userdata] = LeaderboardFormatter();
            console.log(userdata);
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
        <div className="loginsignupheading">
          Welcome {props.newsignup != null ? "Our New" : "Back"} Future Typing
          God!!
        </div>

        <form className="signupcredentials" onSubmit={handle_login}>
          <input
            className="inputfield"
            name="Email"
            placeholder="Email"
            autoComplete="off"
          />

          <input
            className={"inputfield passwordfield"}
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

          <button className="loginsignupbutton">LOGIN</button>
        </form>
      </div>
      <Footer></Footer>
      {showSpinner == true ? <div className="spinner"></div> : ""}
    </div>
  );
};

export default LoginPage;
