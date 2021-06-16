import React, { useState, useEffect } from "react";
import "../Design/Own.css";
import music_on from "../Data/Images/music_on.png";
import music_off from "../Data/Images/music_off.png";
import { Animated } from "react-animated-css";

const PlaySound = ({ url, autoPlay = false }) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(autoPlay); //initally playing value is true if autoplay is enabled else flase

  const toggle = () => setPlaying(!playing); //uses the setplaying function to toggle the state variables value

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]); //whenever playing changes

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false)); // so as to avoid multiple event listeners otherwise everytime i call useeffect an evenlistener will be added
    }; //basically the cleanup function
  }, []); //componentdid mount only initially

  return (
    <Animated
      key={playing}
      animationIn="fadeIn"
      animationOut="slideOutLeft"
      animationInDelay={0}
      animationOutDelay={0}
      animationInDuration={1000}
      animationOutDuration={500}
      animateOnMount={true}
      isVisible={true}
    >
      <div onClick={toggle}>
        {playing ? (
          <img
            style={{
              position: "fixed",
              top: "2vw",
              right: "3vw",
              width: "4vmax",
              height: "8vh",
              cursor: "pointer",
            }}
            src={music_on}
          ></img>
        ) : (
          <img
            style={{
              position: "fixed",
              top: "2vw",
              right: "2vw",
              width: "5vmax",
              height: "8vh",
              cursor: "pointer",
            }}
            src={music_off}
          ></img>
        )}
      </div>
    </Animated>
  );
};

export default PlaySound;
