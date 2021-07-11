import "./App.css";
import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TypingSpeedTest from "./Pages/TypingSpeedTest";
import HomePage from "./Pages/HomePage";
import Nav_bar from "./Components/Nav_bar";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import Handle_api from "./Apis/Handle_api";
import PlaySound from "./Components/PlaySound";
import Tones from "./Data/Songs/TONES AND I - Dance Monkey.mp3";
import SignupPage from "./Pages/SignupPage";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  if (localStorage.length > 0) {
    try {
      let data = JSON.parse(localStorage.getItem("data"));
      if (data.loggedIn === true) {
        console.log("Yes logged in");
        if (!loggedIn) setLoggedIn(true);
      } else {
        if (loggedIn === true) setLoggedIn(false); //if loggedin was true but there no storage in localstorage then we set it to false
      }
    } catch {}
  }
  console.log("hi");
  //console.log(JSON.parse(localStorage.getItem("username")));
  useEffect(() => {
    //this will only run once when the app is loaded so basically its the last thing that runs
    console.log("useeffect called");
    Handle_api("GET", "/CheckAuth", {})
      .then((response) => {
        let data = response;
        if (
          localStorage.length > 0 &&
          JSON.stringify(data) == localStorage.getItem(data)
        ) {
          //if there are no updates needed on the localstorage
          //then no need to do anything
        } else {
          //i will basically use setstate just so that the localstorage gets updated n the components depending on it also get updated
          console.log("dfhdf");
          localStorage.setItem("data", JSON.stringify(data));
          setLoggedIn(loggedIn); //this wont change anything but still update all the components of my app
        }
        if (response.loggedIn === true) {
          setLoggedIn(true);
        }
      })
      .catch((err) =>
        console.log("some error occured while authenticating the cookie")
      );
  }, []);
  return (
    <Router>
      <Nav_bar loggedIn={loggedIn}></Nav_bar>
      <PlaySound url={Tones}></PlaySound>

      <Switch>
        <Route path={"/TypingSpeedTest"}>
          <TypingSpeedTest />
        </Route>

        <Route path="/Login">
          {!loggedIn ? <LoginPage isLogin={1} /> : ""}
        </Route>
        <Route path={"/Signup"}>{!loggedIn ? <SignupPage /> : ""}</Route>
        <Route path="/Profile">
          {!loggedIn ? <HomePage /> : <ProfilePage loggedIn={loggedIn} />}
        </Route>
        <Route path={"/"}>
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
