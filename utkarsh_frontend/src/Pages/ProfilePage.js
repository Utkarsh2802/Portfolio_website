import React, { useState, useContext } from "react";
import { Redirect } from "react-router";
import AreaGraph from "../Components/AreaGraph";
import Barchart from "../Components/Barchart.js";
import LineGraph from "../Components/LineGraph";
import { Card } from "react-bootstrap";
import "../Design/profilepage.css";
import Footer from "../Components/Footer";
import { UserContext } from "../GlobalContexts.js/UserContext";
import useWindowDimensions from "../Utility_functions/UseWIndowDimensions";

const ProfilePage = (props) => {
  const { loggedIn, setLoggedIn } = useContext(UserContext);
  document.body.style.overflowY = "scroll";
  // console.log(loggedIn);

  const [isPhone, setIsPhone] = useState(false);
  const { height, width } = useWindowDimensions();
  if ((width < 1000 && height < 500) || width < 700) {
    document.body.style.overflowY = "scroll";
    document.body.style.overflowX = "hidden";
    if (isPhone == false) setIsPhone(true);
  }

  if (loggedIn) {
    try {
      var data = JSON.parse(localStorage.getItem("data"));
      // console.log(data);
    } catch {
      console.log(
        alert(
          "Someone interfered with the local storage please refresh the page"
        )
      );
    }
    //console.log(data.data);
    //console.log(data.data.speed_history);
  } else {
    //console.log("sdf");
    return <Redirect to="/Login"></Redirect>; //if not logged in then redirect to this page but i dont think its ever gonna be actually executed since only when the loggedin variable is true can the profile component be run throught the router app but still i wanna make it as robust as possible
  }
  try {
    return (
      <div className="safariprofilepageroot">
        <div className="cardgroup">
          <Card className="cust-card" text={"white"}>
            <Card.Header>Overall Average Speed: </Card.Header>
            <Card.Body>
              <Card.Title style={{ fontSize: "inherit" }}>
                {" "}
                {data.data.avg_speed == null
                  ? 0
                  : (data.data.avg_speed * 1).toFixed(2)}{" "}
                WPM{" "}
              </Card.Title>
              {/* by multiplying it by 1 i am just converting it to a number cause toFixed gives an error */}
            </Card.Body>
          </Card>

          <Card className="cust-card" text={"white"}>
            <Card.Header>Improvment Speed:</Card.Header>
            <Card.Body>
              <Card.Title style={{ fontSize: "inherit" }}>
                {data.data.improvement_speed == null
                  ? 0
                  : (data.data.improvement_speed * 60).toFixed(2)}{" "}
                WPM / Hr
              </Card.Title>
            </Card.Body>
          </Card>
          <Card className="cust-card" text={"white"}>
            <Card.Header>Accuracy %</Card.Header>
            <Card.Body>
              <Card.Title style={{ fontSize: "inherit" }}>
                {data.data.speed_history.length == null
                  ? 0
                  : (
                      ((data.data.avg_speed * 5) / //this formulae assumes that the total time is set to 60seconds so change it accordingly later on if you plan on adding more features
                        (data.data.avg_speed * 5 + data.data.avg_error)) *
                      100
                    ).toFixed(2)}
                %
              </Card.Title>
            </Card.Body>
          </Card>
        </div>

        <AreaGraph data={data} />
        <Barchart data={data} />

        <LineGraph data={data}></LineGraph>
        <Footer height={isPhone ? "185vmax" : "185vh"}></Footer>
      </div>
    );
  } catch (err) {
    console.log(err.message);
    alert("We have encountered some error please refresh the page");
  }
};
export default ProfilePage;
