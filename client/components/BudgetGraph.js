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

		new ChartJS(ctx, {
			type: "doughnut",
			data: {
				labels: ["Spent", "Remaining"],
				datasets: [{
					data: [this.props.totalSpent, this.props.amountRemaining],
					label: "Spent",
					borderColor: ['#c14953', 'green'],
					backgroundColor: [
						'#c14953',
						'green'
					],
					hoverBorderWidth: 2,
					fill: false
				}
				]
			},
		})
	}

  render() {
    return (
      <div className="budget-graph">
        <canvas ref={this.chartRef}></canvas>
      </div>
    )
  }
}

export default BudgetGraph;
