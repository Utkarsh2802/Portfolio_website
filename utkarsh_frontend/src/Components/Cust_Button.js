import React from "react";
import "../Design/TypingTestPage.css";
import { Animated } from "react-animated-css";
const Cust_Button = (props) => {
  return (
    <div>
      <Animated
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInDelay={500}
        animationOutDelay={0}
        animationInDuration={1500}
        animationOutDuration={2000}
        animateOnMount={true}
        isVisible={true}
      >
        <button id="custbutton" onClick={props.onClick}>
          <span> {props.name} </span>
        </button>
      </Animated>
    </div>
  );
};
export default Cust_Button;
