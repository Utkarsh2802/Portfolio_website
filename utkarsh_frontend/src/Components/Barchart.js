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

    colors: ["green"], //remember to choose better colors later on
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.5,
        opacityTo: 0.9,
      },
    },
    labels: label,
    markers: {
      size: 0,
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
  };

  // var chart = new ApexCharts(document.querySelector("#chart"), options);
  //chart.render();

  return (
    <div style={{ height: "40vh" }}>
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
