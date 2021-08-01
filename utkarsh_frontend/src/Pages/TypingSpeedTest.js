import React, { useState, useEffect } from "react";

import "../Design/TypingTestPage.css";
import TypingHelper from "../Helpers/TypingHelper";
import pexels9 from "../Data/Images/pexels9.jpg"; //confused between either 3 or 2
import { Animated } from "react-animated-css";
import useWindowDimensions from "../Utility_functions/UseWIndowDimensions";
import Footer from "../Components/Footer";
const TypingSpeedTest = () => {
  // Uncomment everything to use the img tag instead of background image all this code helps in resizing the image depending on the window size
  // const [image, setImage] = useState("");
  //document.body.style ="background-image: linear-gradient(90deg, #0093E9 0%, #80D0C7 100%)";
  // document.body.style.padding = 0;
  // document.body.style.margin = 0;
  document.body.style.overflow = "hidden";
  const { height, width } = useWindowDimensions();
  const [isPhone, setIsPhone] = useState(false);
  if ((width < 1000 && height < 500) || width < 700) {
    document.body.style.overflowY = "scroll";
    document.body.style.overflowX = "hidden";
    if (isPhone == false) setIsPhone(true);
  }
  // const { height, width } = useWindowDimensions(); //this gives mean the exact height whenever i resize my
  // useEffect(() => {
  //   setImage(
  //     <img
  //       src={pexel2}
  //       height={height}
  //       width={width}
  //       alt="Some Error occured while loading the background"
  //     />
  //   );
  // }, [height, width]);
  // const [loaded, setLoaded] = useState(false);
  // const img = new Image();
  // img.onload = () => {
  //   console.log("img loaded");
  //   setLoaded(true);
  // };

  // useEffect(() => {
  //   img.src = pexels9;
  //   console.log("hi utkarsh");
  // }, []);
  return (
    <div>
      {/* {loaded ? (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            backgroundImage: `url(${pexels9})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      ) : (
        ""
      )} */}
      <div style={{ position: "absolute", top: "5vh", left: 0 }}>
        <TypingHelper></TypingHelper>
      </div>
      <Footer height={isPhone ? "92vmax" : "92vh"}></Footer>
    </div>
  );
};

export default TypingSpeedTest;
