import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import moment from 'moment';
ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function SpendingPieChart(props) {
	const { transactionsByDate } = props;
	let labels = [];

	transactionsByDate.map((item) => {
		if (!labels.includes(item.category) && item.category !== "Transfer") {
			labels.push(item.category);
		}
	});

	let dataAmount = [];
	// o: these are not being used anywhere
	const startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
	const endDate = moment().format('YYYY-MM-DD');

	// o: why are you using a map here, there is no variable that capturing
		// 	the return value
	labels.forEach((category, i) => {
		dataAmount.push(0);
		transactionsByDate.map((item) => {
			if (
				category === item.category
			) {
				dataAmount[i] += item.amount;
			}
		});
	});

	let data = {
		labels: labels,
		datasets: [
			{
				label: 'Categories',
				data: dataAmount,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				],
				borderWidth: 1,
			},
		],
	};

	let options = {
		plugins: {
			title: {
				display: true,
				position: 'top',
				text: 'Spending by Category',
				fontSize: 50,
			},
		},
		animation: {
			animateScale: true,
		},
		layout: {
			padding: {
				left: 50,
				right: 50,
				top: 50,
				bottom: 50,
			},
		},
		legend: {
			display: true,
			position: 'right',
		},
	};
	return (
		<div className="pieChart">
			<Pie options={options} data={data} />
			<small>*chart does not include transfers</small>
		</div>
	);
}
