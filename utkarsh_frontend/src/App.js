import "./App.css";
import React, { useState } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TypingSpeedTest from "./Pages/TypingSpeedTest";
import HomePage from "./Pages/HomePage";
import Nav_bar from "./Components/Nav_bar";
import LoginPage from "./Pages/LoginPage";
import Handle_api from "./Apis/Handle_api";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  Handle_api("GET", "/CheckAuth", {})
    .then((response) => {
      console.log(response);
      console.log("sdf");
      if (response.loggedIn === true) {
        setLoggedIn(true);
      }
    })
    .catch((err) =>
      console.log("some error occured while authenticating the cookie")
    );
  return (
    <Router>
      <Nav_bar loggedIn={loggedIn}></Nav_bar>
      <Switch>
        {!loggedIn ? (
          <React.Fragment>
            <Route path="/Login">
              <LoginPage isLogin={1} />
            </Route>
            <Route path={"/Signup"}>
              <LoginPage isLogin={0} />
            </Route>
          </React.Fragment>
        ) : (
          ""
        )}

        <Route path={"/TypingSpeedTest"}>
          <TypingSpeedTest />
        </Route>
        <Route path={"/"}>
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
