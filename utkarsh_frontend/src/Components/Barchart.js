import React from "react";
import Chart from "react-apexcharts";
const Barchart = (props) => {
  console.log(props.data);
  let alpha_accuracy = props.data.data.alpha.map((element, index) => {
    return 100 - Math.round((element.total_errors / element.total_count) * 100);
  });
  let label = props.data.data.alpha.map((element, index) => {
    return element.alphabetname.toUpperCase();
  });

  var series = [
    {
      name: "Accuracy",
      type: "area",
      data: alpha_accuracy,
    },
  ];
  var options = {
    chart: {
      type: "bar",
      // stacked: "true",
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      colors: ["green"],
      type: "gradient", // gradient
      gradient: {
        type: "vertical", // The gradient in the horizontal direction
        gradientToColors: ["#00C3DF"], // The color at the end of the gradient
        opacityFrom: 1, // transparency
        opacityTo: 1,
        stops: [0, 120],
      },
    },
    labels: label,
    markers: {
      size: 0,
    },
    grid:{
      show:false,//so that i dont see background lines which make it cluttered
    },
    yaxis: [
      {
        title: {
          text: "Accuracy %",
        },
        max: 100,
        min: 0,
        // logarithmic: true,
        //max: 150,
      },
    ],
    title: {
      text: "Average Accuracy of all the characters across all the tests taken",
      align: "center",
      floating: true, //make it false to create some distance between the graph and the title
      style: {
        fontFamily: "cursive",
        fontWeight: 500,
      },
    },
  };

  // var chart = new ApexCharts(document.querySelector("#chart"), options);
  //chart.render();

  return (
    <div style={{ height: "100%", padding: "2vmin" }}>
      <Chart
        options={options}
        series={series}
        type="bar"
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
};

export default Barchart;
