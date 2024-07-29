import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";
import { Row, Col, CardBody, Card, Progress } from "reactstrap";
class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    // Fetch data from backend and update state
    // For now, I'll use the provided sample data
    const dataFromBackend = [
      {
        amount: "98",
        name: "FSD",
      },
      {
        amount: "98",
        name: "AWS",
      },
      {
        amount: "98",
        name: "PEGA",
      },
      {
        amount: "98",
        name: "Salesforce",
      },
      {
        amount: "98",
        name: "FSD",
      },
      {
        amount: "110",
        name: "Google Devops",
      },
      {
        amount: "76",
        name: "Gaming",
      },
    ];

    // Preprocess data to sum up values for entries with the same key
    const preprocessedData = dataFromBackend.reduce((acc, cur) => {
      if (acc[cur.name]) {
        acc[cur.name] += parseFloat(cur.amount);
      } else {
        acc[cur.name] = parseFloat(cur.amount);
      }
      return acc;
    }, {});
    // Convert preprocessed data back to array format
    const formattedData = Object.keys(preprocessedData).map((key) => ({
      name: key,
      amount: preprocessedData[key].toString(),
    }));

    this.setState({ data: formattedData });
  }

  getOption = () => {
    const { data } = this.state;
    const legendData = data.map((item) => item.name);
    const seriesData = data.map((item) => ({
      value: parseFloat(item.amount), // Convert amount to number
      name: item.name,
    }));

    return {
      toolbox: {
        show: false,
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      // legend: {
      //   orient: "vertical",
      //   left: "left",
      //   data: legendData,
      //   textStyle: {
      //     color: ["#74788d"],
      //   },
      // },
      color: ["#ec4561", "#f8b425", "#02a499", "#38a4f8", "#3c4ccf", "#343a40"],
      series: [
        {
          name: "Expenditure",
          type: "pie",
          radius: "55%",
          center: ["50%", "50%"],
          data: seriesData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
  };

  render() {
    return (
      <>
        <div className="page-content">
          <Row>
            {/* Increase height of the card */}

            <React.Fragment>
              <ReactEcharts option={this.getOption()} />
            </React.Fragment>
          </Row>
        </div>
      </>
    );
  }
}
export default PieChart;
