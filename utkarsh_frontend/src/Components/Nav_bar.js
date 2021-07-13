import React from "react";

import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import "../Design/Nav.css";
import { Link } from "react-router-dom";
import Handle_api from "../Apis/Handle_api";
const Nav_bar = (props) => {
  const Handle_logout = (event) => {
    localStorage.clear();
    Handle_api("POST", "/Logout", {})
      .then((response) => {
        console.log("Logged out successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="nav_custom_colortest">
      <Navbar variant="dark">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",

            alignItems: "center",
          }}
          className="safarinavbar"
        >
          <Navbar.Brand className="navlogo" href="#home">
            Typing God{" "}
          </Navbar.Brand>
          <Link to="/">
            <Navbar.Text>Home</Navbar.Text>
          </Link>
          <Link to="/TypingSpeedTest">
            <Navbar.Text>Typing Test</Navbar.Text>
          </Link>

          {props.loggedIn ? (
            <React.Fragment>
              <Link to="/Profile">
                <Navbar.Text>Profile</Navbar.Text>
              </Link>
              <div onClick={Handle_logout} className="logoutbutton">
                <Navbar.Text>Logout</Navbar.Text>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link to="/Login">
                <Navbar.Text>Login</Navbar.Text>
              </Link>

              <Link to="/Signup">
                <Navbar.Text>Signup</Navbar.Text>
              </Link>
            </React.Fragment>
          )}
        </div>
      </Navbar>
    </div>
  );
};

export default Nav_bar;
