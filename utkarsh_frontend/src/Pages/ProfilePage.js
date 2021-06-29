import React from "react";
import { Redirect } from "react-router";
import AreaGraph from "../Components/AreaGraph";
import Barchart from "../Components/Barchart.js";
import LineGraph from "../Components/LineGraph";
import { Card } from "react-bootstrap";
const ProfilePage = (props) => {
  console.log(props.loggedIn);
  if (props.loggedIn) {
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

  return (
    <div
      style={{
        marginLeft: "15vmin",
        marginRight: "15vmin",
        height: "120vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        gap: "5vmin",
      }}
    >
      <div
        style={{
          // margin: "2vmax",
          padding: "3vmin",
          display: "flex",
          justifyContent: "space-around",
          gap: "2vmin",
        }}
      >
        <Card bg={"primary"} text={"white"} style={{ width: "18rem" }}>
          <Card.Header>Overall Average Speed: </Card.Header>
          <Card.Body>
            <Card.Title> {data.data.avg_speed.toFixed(2)} WPM </Card.Title>
          </Card.Body>
        </Card>
        <Card bg={"success"} text={"white"} style={{ width: "18rem" }}>
          <Card.Header>Improvment Speed:</Card.Header>
          <Card.Body>
            <Card.Title>
              {(data.data.improvement_speed * 60).toFixed(2)} WPM / Hr
            </Card.Title>
          </Card.Body>
        </Card>
        <Card bg={"danger"} text={"white"} style={{ width: "18rem" }}>
          <Card.Header>Error %</Card.Header>
          <Card.Body>
            <Card.Title>
              {(
                100 -
                ((data.data.avg_speed * 5) /
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
    </div>
  );
};

export default ProfilePage;
