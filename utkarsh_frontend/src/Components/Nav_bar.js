import React from "react";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
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
        <Navbar.Brand href="#home">UTKARSH</Navbar.Brand>
        <Nav className="mr-auto">
          <Link to="./">
            <Navbar.Text>Home</Navbar.Text>
          </Link>
          {!props.loggedIn ? (
            <React.Fragment>
              <Link to="./Login">
                <Navbar.Text>Login</Navbar.Text>
              </Link>

              <Link to="./Signup">
                <Navbar.Text>Signup</Navbar.Text>
              </Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Button onClick={Handle_logout}>Logout</Button>
              <Link to="./Profile">
                <Navbar.Text>Profle</Navbar.Text>
              </Link>
            </React.Fragment>
          )}
          <Link to="./TypingSpeedTest">
            <Navbar.Text>Typing Test</Navbar.Text>
          </Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Nav_bar;
