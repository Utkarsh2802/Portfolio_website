import React from "react";
//import "../Design/Own.css";
import useWindowDimensions from "../Utility_functions/UseWIndowDimensions";
import "../Design/HomePage.css";
import { Link } from "react-router-dom";
const HomePage = (props) => {
  document.body.style.padding = 0;
  document.body.style.margin = 0;
  document.body.style.overflow = "hidden";
  const { height, width } = useWindowDimensions();

  /*  <video autoPlay loop muted>
        <source src={sample} type="video/mp4" />
      </video>
    */
  return (
    <div
      style={{
        height: height,
        width: width,
        display: "flex",
        backgroundColor: "#e7e5e4",
      }}
      className="roothomepage"
    >
      <h1 className="shadowytext">Typing God</h1>
      {props.loggedIn == false ? (
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
          Congratulations you have taken the first step towards becoming a
          Typing God, now all you have to do is keep practicing!
        </div>
      )}
      <div
        style={{
          position: "absolute",
          top: "95vh",
          alignContent: "center",
        }}
      >
        <span className="musicattribution">
          <span className="attribution">
            Song From: Avicii - The Nights (Alex Bamford Remix) de Alex Bamford
            está posteada bajo una licencia Creative Commons.
          </span>
          <span className="musicattribution">Copyright</span> &#169; 2021
          Utkarsh Agarwal
        </span>
      </div>
    </div>
  );
};

export default HomePage;
