import React from "react";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import "../Design/Nav.css";
const Nav_bar = (props) => {
  return (
    <div className="nav_custom_colortest">
      <Navbar variant="dark">
        <Navbar.Brand href="#home">UTKARSH</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="./">Home</Nav.Link>
          {!props.loggedIn ? (
            <React.Fragment>
              <Nav.Link href="./Login">Login</Nav.Link>
              <Nav.Link href="./Signup">Signup</Nav.Link>
            </React.Fragment>
          ) : (
            <button>Logout</button>
          )}
          <Nav.Link href="./TypingSpeedTest">Typing Test</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Nav_bar;
