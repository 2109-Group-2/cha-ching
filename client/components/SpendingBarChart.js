import React from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Tooltip,
	Legend,
	Title,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Tooltip,
	Legend,
	Title
);

export default function SpendingBarGraph(props) {
	const { transactionsByDate, comparisonData } = props;
	let labels = [];

	transactionsByDate.map((item) => {
		if (!labels.includes(item.category) && item.category !== "Transfer") {
			labels.push(item.category);
		}
	});

	let dataAmount = [];
	let comparison = [];

	labels.forEach((category, i) => {
		dataAmount.push(0);
		transactionsByDate.map((item) => {
			if (category === item.category) {
				dataAmount[i] += item.amount;
			}
		});
	});

	labels.forEach((category, i) => {
		comparison.push(0);
		comparisonData.map((item) => {
			if (category === item.category) {
				comparison[i] += item.amount;
			}
		});
	});

	let data = {
		labels: labels,
		datasets: [
			{
				label: 'now',
				data: dataAmount,
				backgroundColor: [
					'rgba(50, 125, 65, 0.2)',
				],
				borderColor: [
					'rgba(50, 125, 65, 1)',
				],
				minBarLength: 15,
			},
			{
				label: 'then',
				data: comparison,
				backgroundColor: [
					'rgba(200, 173, 85, 0.2)',
				],
				borderColor: [
					'rgba(200, 173, 85, 1)',
				],
				minBarLength: 15,
			},
		],
	};

	let options = {
		plugins: {
			title: {
				display: true,
				position: 'top',
				text: 'Transactions Comparison',
				fontSize: 50,
			},
			legend: {
				display: true,
			},
		},
		animation: {
			animateScale: true,
		},
		indexAxis: 'y',
		elements: {
			bar: {
				borderWidth: 2,
			},
		},
		responsive: true,
	};
	return (
		<div className="pieChart">
			<Bar options={options} data={data} type="horizontalBar" />
			<small>*chart does not include transfers</small>
		</div>
	);
}
