import React from "react";
import Chart from "react-apexcharts";
import "../Design/profilepage.css";
import useWindowDimensions from "../Utility_functions/UseWIndowDimensions";
const AreaGraph = (props) => {
  //console.log(props.data);
  const { height, width } = useWindowDimensions(); //so that i can resize my title size accordingly there was no way to use viewport width it was only taking px value for font size
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
    noData: {
      text: "Not enough data available",
      align: "center",
      verticalAlign: "center",
      offsetX: 0,
      offsetY: 0,
      style: {
        color: "Blue",
        fontSize: "16px",
        fontFamily: "'Comic Sans MS', 'Comic Sans',sans-serif",
      },
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
        fontFamily: "'Comic Sans MS', 'Comic Sans',sans-serif",
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
    legend: {
      show: true,
      fontFamily: "'Comic Sans MS', 'Comic Sans',sans-serif",
      markers: {
        fillColors: ["blue", "red"],
      },
    },
  };

  // var chart = new ApexCharts(document.querySelector("#chart"), options);
  //chart.render();

  return (
    <div className="profilegraph">
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
