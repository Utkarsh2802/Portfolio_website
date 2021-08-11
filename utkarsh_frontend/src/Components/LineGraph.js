import React, { useState } from "react";
import Chart from "react-apexcharts";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";
import "../Design/profilepage.css";
import useWindowDimensions from "../Utility_functions/UseWIndowDimensions";
const LineGraph = (props) => {
  const [currAlpha, setCurrAlpha] = useState("a");
  var acc = [];
  if (props.data.data.alpha.length > 0) {
    props.data.data.alpha[currAlpha.charCodeAt(0) - 97].accuracy.map(
      (element, index) => {
        // console.log(acc, element);
        return element == 200 ? -1 : acc.push(Math.round(element)); // so that i dont have null values ie suppose z didnt occur in a test then i will skip it and not show it in the graph in the db i m sroting it as 200 so as to avoaid conflicts with 0 accuracy
      }
    );
  }
  const { height, width } = useWindowDimensions();
  const handleClick = (event) => {
    // console.log(event.target.id);
    setCurrAlpha(event.target.id);
  };
  //console.log(acc);
  var series = [
    {
      name: currAlpha,
      type: "area",
      data: acc,
    },
  ];
  var options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    noData: {
      text: "Not enough data available",
      align: "center",
      verticalAlign: "center",
      offsetX: 0,
      offsetY: 0,
      style: {
        color: "Blue",
        fontSize: "16px",
        fontFamily: "'Comic Sans MS', 'Comic Sans','Marker Felt',sans-serif",
      },
    },
    dataLabels: {
      enabled: false,
    },

    grid: {
      show: false, //this will render the rest of the lines below this moot but i am keeping it for future reference
      yaxis: {
        lines: {
          show: true,
        },
      },
      row: {
        colors: undefined,
        opacity: 0.1,
      },
      column: {
        colors: undefined,
        opacity: 0.1,
      },
    },
    stroke: {
      show: true,
      curve: "smooth",
      colors: "green", //if i leave it undefined i get an ugly border
    },

    fill: {
      // background-image: linear-gradient(to right, #a330b8, #158897);
      colors: ["#a330b8"],
      type: "gradient", // gradient
      gradient: {
        type: "vertical", // The gradient in the horizontal direction
        gradientToColors: ["#158897"], // The color at the end of the gradient
        opacityFrom: 1, // transparency
        opacityTo: 1,
        stops: [0, 120], //this is useless in this case but i am just keeping so that later on i can see how the graph varies with it
      },
    },
    labels: [""],
    markers: {
      size: 0,
    },
    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: function (v) {
          return v;
        },
      },
      z: { show: false },

      // marker: { show: false },
    },
    yaxis: [
      {
        title: {
          text: "Accuracy %",
        },
        max: 100,
        min: 0,
        forceNiceScale: true,
        // logarithmic: true,
        //max: 150,
      },
    ],
    xaxis: {
      //tickAmount: 10,
      tooltip: { enabled: false },
    },
    // legend: { show: true },
    title: {
      text: `Accuracy of character ${currAlpha.toUpperCase()} over all the typing tests that you have taken`,
      align: "center",
      floating: true, //make it false to create some distance between the graph and the title
      style: {
        fontFamily: "'Comic Sans MS', 'Comic Sans','Marker Felt',sans-serif",
        fontWeight: 500,
        fontSize:
          width < 300
            ? Math.round(width / 40)
            : width < 500
            ? Math.round(width / 40)
            : width < 900
            ? Math.round(width / 45)
            : 16,
      },
    },
  };

  return (
    <div
      style={{
        padding: "0vmin",
        // display: "flex",
        // flexDirection: "column",
      }}
    >
      <DropdownButton
        id="dropdown-item-button"
        drop="down"
        title={
          <span
            style={{
              color: "white",
              fontSize: "3vmin",
              textAlign: "center",
            }}
          >
            {"Accuracy of: " + currAlpha.toUpperCase()}
          </span>
        }
        variant="Success"
        className="drop-down-color"
      >
        <div
          style={{
            maxHeight: "17vh",
            overflowY: "auto",
            padding: 0,
          }}
        >
          {props.data.data.alpha.map((element, index) => {
            return (
              <Dropdown.Item
                id={element.alphabetname}
                onClick={handleClick}
                className="drop-down-item-color"
              >
                {element.alphabetname.toUpperCase()}
              </Dropdown.Item>
            );
          })}
        </div>
      </DropdownButton>
      <div className="profile-graph">
        <Chart
          options={options}
          series={series}
          type={"area"}
          width={"100%"}
          height={"100%"}
        />
      </div>
    </div>
  );
};

export default LineGraph;
