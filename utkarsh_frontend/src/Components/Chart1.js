import React from "react";
import Chart from "react-apexcharts";
const Chart1 = (props) => {
  console.log(props.data);
  var series = [
    {
      name: "WPM",
      type: "area",
      data: props.data.data.speed_history,
    },
    {
      name: "Error%",
      type: "area",
      data: props.data.data.error_history,
    },
  ];
  var options = {
    chart: {
      type: "area",
      // stacked: "true",
    },
    dataLabels: {
      enabled: false,
    },

    stroke: {
      curve: "smooth",
    },

    colors: ["green", "red"], //remember to choose better colors later on
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.5,
        opacityTo: 0.8,
      },
    },
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    markers: {
      size: 0,
    },
    yaxis: [
      {
        title: {
          text: "WPM",
        },
        //max: 150,
      },
      {
        opposite: true,
        title: {
          text: "Error%",
        },
        max: 100,
        min: 0,
        /*labels: {
          formatter: function (value) {
            return value;
          },
        },*/
      },
    ],
  };

  // var chart = new ApexCharts(document.querySelector("#chart"), options);
  //chart.render();

  return (
    <div style={{ height: "55vh" }}>
      <Chart options={options} series={series} width={"100%"} height={"100%"} />
    </div>
  );
};

export default Chart1;
