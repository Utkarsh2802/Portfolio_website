import React, { useState, useContext } from "react";

import useWindowDimensions from "../Utility_functions/UseWIndowDimensions";
import "../Design/HomePage.css";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import { UserContext } from "../GlobalContexts.js/UserContext";
const HomePage = (props) => {
  const { loggedIn, setLoggedIn } = useContext(UserContext);
  document.body.style.padding = 0;
  document.body.style.margin = 0;
  document.body.style.overflow = "hidden";
  const { height, width } = useWindowDimensions();
  const [isPhone, setIsPhone] = useState(false);
  if ((width < 1000 && height < 500) || width < 700) {
    document.body.style.overflowY = "scroll"; //so that i have scrolling option on phones
    document.body.style.overflowX = "hidden";
    if (isPhone == false) setIsPhone(true);
  }
  /*  <video autoPlay loop muted>
        <source src={sample} type="video/mp4" />
      </video>
    */
  return (
    <div
      style={{
        height: height, //just added 50 cuz the height of the div was not filling the full page for phones
        width: width,
        display: "flex",
        // backgroundColor: "#e7e5e4",
      }}
      className="root-home-page"
    >
      <h1 className="shadowy-text">Typing God</h1>
      {loggedIn == false ? (
        <React.Fragment>
          <div className="container-of-option">
            <div className="heading">Wanna become a Typing God?</div>
            <div className="arrow "></div>

            <div className="heading">
              <Link to="/Signup">
                <button id="home-page-button">Signup</button>
              </Link>{" "}
              OR{" "}
              <Link to="/Login">
                <button id="home-page-button">Login</button>
              </Link>
            </div>
          </div>
          <div className="container-of-option">
            <div className="heading">Just wanna test your Typing Speed?</div>
            <div className="arrow"></div>
            <div className="heading">
              <Link to="/TypingSpeedTest">
                <button id="home-page-button">Typing Test</button>
              </Link>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <div className="heading-on-login">
          Congratulations {props.username} you have taken the first step towards
          becoming a Typing God, now all you have to do is keep practicing!
        </div>
      )}
      <Footer height={isPhone ? "85vmax" : "85vh"}></Footer>
    </div>
  );
};

export default HomePage;
