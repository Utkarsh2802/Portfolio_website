import React from "react";
//import "../Design/Own.css";
import PlaySound from "../Components/PlaySound";
import Tones from "../Data/Songs/TONES AND I - Dance Monkey.mp3";
import useWindowDimensions from "../Utility_functions/UseWIndowDimensions";
import "../Design/HomePage.css";
const HomePage = () => {
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
        flexDirection: "column",

        gap: "13vh",
        alignItems: "center",
      }}
    >
      <h1 className="shadowytext">Typing God</h1>
      <div className="containerofoption">
        <div className="heading">Wanna become a Typing God?</div>
        <div className="arrow "></div>

        <div className="heading">
          <button id="homepagebutton">Singup</button> OR{" "}
          <button id="homepagebutton">Login</button>
        </div>
      </div>
      <div className="containerofoption">
        <div className="heading">Just Wanna test your Typing Speed?</div>
        <div className="arrow"></div>
        <div className="heading">
          <button id="homepagebutton">Typing Test</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
