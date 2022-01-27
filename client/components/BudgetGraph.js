import React, { Component } from "react";
import { Chart as ChartJS, DoughnutController, ArcElement, Tooltip, Legend, Title } from 'chart.js';
ChartJS.register(ArcElement, DoughnutController, Tooltip, Legend, Title);

class BudgetGraph extends Component {
  constructor(props) {
    super(props);
  }

  chartRef = React.createRef();

  componentDidMount() {
		const ctx = this.chartRef.current.getContext("2d");
    // const ctx = document.getElementById("myChart");

		new ChartJS(ctx, {
			type: "doughnut",
			data: {
				labels: ["Spent", "Remaining"],
				datasets: [{
					data: [this.props.totalSpent, this.props.amountRemaining],
					label: "Spent",
					borderColor: "#3e95cd",
					backgroundColor: "#7bb6dd",
					fill: false
				}
				]
			}
		})
	}

  render() {
    // const { budget, transactions } = this.props;

    return (
      <div className="pieChart">
        {/* <Doughnut options={options} data={data} /> */}
        <canvas ref={this.chartRef} width="200" height="200"></canvas>
      </div>
    )
  }
}

export default BudgetGraph;
