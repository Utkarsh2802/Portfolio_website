import React from "react";
import { Redirect } from "react-router";

const ProfilePage = (props) => {
  console.log(props.loggedIn);
  if (!props.loggedIn) {
    try {
      let data = JSON.parse(localStorage.getItem("data"));
      console.log(data);
    } catch {
      console.log(
        "Someone interfered with the local storage please refresh the page"
      );
    }
  } else {
    //console.log("sdf");
    return <Redirect to="/Login"></Redirect>; //if not logged in then redirect to this page but i dont think its ever gonna be actually executed since only when the loggedin variable is true can the profile component be run throught the router app but still i wanna make it as robust as possible
  }

  return <div> hi</div>;
};

export default ProfilePage;
