import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import moment from 'moment';
ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function SpendingPieChart(props) {
	const { transactionsData } = props;
	let labels = [];

	transactionsData.map((item) => {
		if (!labels.includes(item.category)) {
			labels.push(item.category);
		}
	});

	let dataAmount = [];
	const startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
	const endDate = moment().format('YYYY-MM-DD');

	labels.forEach((category, i) => {
		dataAmount.push(0);
		transactionsData.map((item) => {
			if (
				category === item.category &&
				moment(item.date).isBetween(startDate, endDate)
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
				text: 'Spending by Category for Last 30 Days',
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
		</div>
	);
}
