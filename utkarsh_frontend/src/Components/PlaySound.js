import React, { useState, useEffect } from "react";
import "../Design/Own.css";

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
    <div>
      <button className="button" onClick={toggle}>
        <span> {playing ? "Pause" : "Play"} </span>
      </button>
    </div>
  );
};

export default PlaySound;
