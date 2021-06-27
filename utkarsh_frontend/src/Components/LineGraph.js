import React, { useState } from "react";
import Chart from "react-apexcharts";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";
const LineGraph = (props) => {
  const [curr_alpha, setCurr_alpha] = useState("a");
  var acc = [];
  props.data.data.alpha[curr_alpha.charCodeAt(0) - 97].accuracy.map(
    (element, index) => {
      console.log(acc, element);
      return element == 200 ? -1 : acc.push(Math.round(element));
    }
  );

  const handle_click = (event) => {
    console.log(event.target.id);
    setCurr_alpha(event.target.id);
  };
  console.log(acc);
  var series = [
    {
      name: curr_alpha,
      type: "area",
      data: acc,
    },
  ];
  var options = {
    noData: {
      text: "Not enough data available",
      align: "center",
      verticalAlign: "center",
      offsetX: 0,
      offsetY: 0,
      style: {
        color: "Blue",
        fontSize: "16px",
        fontFamily: "cursive",
      },
    },
    dataLabels: {
      enabled: false,
    },

    grid: {
      show: true,
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

    colors: ["green"], //remember to choose better colors later on
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.5,
        opacityTo: 0.8,
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
        //forceNiceScale: true,
        // logarithmic: true,
        //max: 150,
      },
    ],
    xaxis: {
      //tickAmount: 10,
      tooltip: { enabled: false },
    },
    // legend: { show: true },
  };

  return (
    <div style={{ height: "40vh" }}>
      <DropdownButton
        id="dropdown-item-button"
        drop="down"
        title={"Accuracy of: " + curr_alpha.toUpperCase()}
      >
        <div style={{ maxHeight: "17vh", overflowY: "auto" }}>
          {props.data.data.alpha.map((element, index) => {
            return (
              <Dropdown.Item id={element.alphabetname} onClick={handle_click}>
                {element.alphabetname.toUpperCase()}
              </Dropdown.Item>
            );
          })}
        </div>
      </DropdownButton>

      <Chart
        options={options}
        series={series}
        type={"area"}
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
};

export default LineGraph;
