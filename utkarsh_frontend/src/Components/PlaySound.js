import React, { useState, useEffect } from "react";
import "../Design/Globalelements.css";
import musicOn from "../Data/Images/musicOn.png";
import musicOff from "../Data/Images/musicOff.png";

const PlaySound = ({ url, autoPlay = false }) => {
  const [audio] = useState(new Audio());
  audio.src = url;
  const [playing, setPlaying] = useState(autoPlay); //initally playing value is true if autoplay is enabled else flase
  audio.loop = true;
  const toggle = () => setPlaying(!playing); //uses the setplaying function to toggle the state variables value
  if (playing && audio.paused) audio.play();
  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]); //whenever playing changes
  console.log(playing);

  return (
    <div className="floating" onClick={toggle}>
      {playing ? (
        <img
          className="musicOn"
          src={musicOn}
          alt={
            "Wanna get good at typing? Or just wanna test your typing speed? Get all features in one for free as we help you become a typing god."
          }
        ></img>
      ) : (
        <img
          className="musicOff"
          src={musicOff}
          alt={
            "Wanna get good at typing? Or just wanna test your typing speed? Get all features in one for free as we help you become a typing god. "
          }
        ></img>
      )}
    </div>
  );
};

export default PlaySound;
