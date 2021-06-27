import React from "react";
import Chart from "react-apexcharts";
const AreaGraph = (props) => {
  console.log(props.data);
  var series = [
    {
      name: "WPM",
      data: props.data.data.speed_history,
    },
    {
      name: "Error%",

      data: props.data.data.error_history,
    },
  ];
  var options = {
    dataLabels: {
      enabled: false,
    },

    stroke: {
      show: false,
      curve: "smooth",
      //color: "green",
    },

    colors: ["green", "red"], //remember to choose better colors later on
    fill: {
      type: ["gradient", "gradient"],
      gradient: {
        type: "horizontal",
        opacityFrom: 0.4,
        opacityTo: 0.7,
      },
    },
    labels: [""],
    markers: {
      size: 0,
    },
    tooltip: {
      x: { show: false },
      // y: { show: false },
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
        max: 50,
        min: 0,
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
      tooltip: { enabled: false },
    },
  };

  // var chart = new ApexCharts(document.querySelector("#chart"), options);
  //chart.render();

  return (
    <div style={{ height: "50vh" }}>
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
