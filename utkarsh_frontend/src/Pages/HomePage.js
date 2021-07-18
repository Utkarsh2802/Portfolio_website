import React, { useContext } from "react";

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
  if (width < 500) {
    document.body.style.overflowY = "scroll"; //so that i have scrolling option on phones
    document.body.style.overflowX = "hidden";
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
      className="roothomepage"
    >
      <h1 className="shadowytext">Typing God</h1>
      {loggedIn == false ? (
        <React.Fragment>
          <div className="containerofoption">
            <div className="heading">Wanna become a Typing God?</div>
            <div className="arrow "></div>

            <div className="heading">
              <Link to="/Signup">
                <button id="homepagebutton">Singup</button>
              </Link>{" "}
              OR{" "}
              <Link to="/Login">
                <button id="homepagebutton">Login</button>
              </Link>
            </div>
          </div>
          <div className="containerofoption">
            <div className="heading">Just Wanna test your Typing Speed?</div>
            <div className="arrow"></div>
            <div className="heading">
              <Link to="/TypingSpeedTest">
                <button id="homepagebutton">Typing Test</button>
              </Link>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <div className="headingonlogin">
          {console.log(props)}
          Congratulations {props.username} you have taken the first step towards
          becoming a Typing God, now all you have to do is keep practicing!
        </div>
      )}
      <Footer height={"85vh"}></Footer>
    </div>
  );
};

export default HomePage;
