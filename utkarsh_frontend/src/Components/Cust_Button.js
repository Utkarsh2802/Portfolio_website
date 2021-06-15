import React from "react";
import "../Design/Own.css";
const Cust_Button = (props) => {
  return (
    <div>
      <button className="button" onClick={props.onClick}>
        <span> {props.name} </span>
      </button>
    </div>
  );
};
export default Cust_Button;
