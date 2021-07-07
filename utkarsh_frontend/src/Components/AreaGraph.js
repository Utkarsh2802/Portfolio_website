import React from "react";
import Chart from "react-apexcharts";

const AreaGraph = (props) => {
  console.log(props.data);

  let errorpercent = [];
  let index = 0;
  while (index < props.data.data.error_history.length) {
    errorpercent.push(
      Math.round(
        (props.data.data.error_history[index] /
          (props.data.data.speed_history[index] * 5 +
            props.data.data.error_history[index])) *
          100
      )
    );
    index++;
  }
  var series = [
    {
      name: "WPM",
      data: props.data.data.speed_history,
    },
    {
      name: "Error%",

      data: errorpercent,
    },
  ];
  var options = {
    chart: {
      toolbar: { show: false },
    },
    dataLabels: {
      enabled: false,
    },

    stroke: {
      show: false,
      curve: "smooth",
      color: "green",
    },
    colors: ["blue", "red"], //this changes the tooltip color too !importantttt
    //colors: ["green", "red"], //remember to choose better colors later on
    fill: {
      // background-image: linear-gradient(to right, #a330b8, #158897);
      colors: ["#a330b8", "#c42727"],
      type: ["gradient", "gradient"], // gradient
      gradient: {
        type: "vertical", // The gradient in the horizontal direction
        gradientToColors: ["#158897", "#941616"], // The color at the end of the gradient
        opacityFrom: 1, // transparency
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    labels: [""],

    tooltip: {
      x: {
        show: false,
      },
      marker: {
        show: true,
      },
      //  y: { show: false },
    },
    grid: {
      show: true,
      strokeDashArray: 1,
      yaxis: {
        lines: {
          show: true,
        },
      },

      row: {
        colors: undefined,
        opacity: 0.9,
      },
      column: {
        colors: undefined,
        opacity: 0.9,
      },
    },
    yaxis: [
      {
        title: {
          text: "WPM",
        },
        // logarithmic: true,
        //max: 150,
      },
      {
        opposite: true,
        title: {
          text: "Error%",
        },
        //labels:["10","23","45"],
        //max: 150,
        //min: 0,
        //logarithmic: true,
        /*labels: {
          formatter: function (value) {
            return value;
          },
        },*/
      },
    ],
    xaxis: {
      //tickAmount: 10,
      tooltip: {
        enabled: false,
      },
    },
    title: {
      text: "How your speed varies with respect to errors over all the tests",
      align: "center",
      floating: true, //make it false to create some distance between the graph and the title
      style: {
        fontFamily: "cursive",
        fontWeight: 500,
      },
    },
    legend: {
      show: true,
      fontFamily: "cursive",
      markers: {
        fillColors: ["blue", "red"],
      },
    },
  };

  // var chart = new ApexCharts(document.querySelector("#chart"), options);
  //chart.render();

  return (
    <div
      style={{
        height: "40vmin",
        //maxHeight: "45vmin",
        padding: "2vmin",
      }}
    >
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

export default AreaGraph;
