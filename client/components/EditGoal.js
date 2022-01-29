import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useContext, useState } from 'react';
import { fetchSingleGoal } from '../store/savingGoals';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import moment from 'moment';
ChartJS.register(ArcElement, Tooltip, Legend, Title);

class EditGoal extends Component {
	constructor() {
		super();
		this.state = {
			calculate: 0,
			daily: 0,
			biWeekly: 0,
			monthly: 0,
			yearly: 0,
			days: 0,

			biWeeks: 0,
			months: 0,
			years: 0,
		};
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		console.log(' this.props.fetchGoal: ', this.props.userId, this.props.id);
		let values = {
			userId: this.props.userId,
			id: this.props.id,
		};
		this.props.fetchGoal(values);
	}

	handleChange(event, id) {
		let { currentBalance, goalTarget } = this.props.goal[0];
		let val = event.target.value;
		this.setState({
			[event.target.name]: val,
			daily: val / 7,
			weekly: val,
			biWeekly: val * 2,
			monthly: val * 4,
			yearly: val * 12 < 0 ? 0 : val * 12,
			days: Math.round((goalTarget / (val / 7)) * 100) / 100,
			weeks: goalTarget / val,
			biWeeks: goalTarget / (val * 2),
			months: goalTarget / (val * 4),
			years: goalTarget / (val * 12),
		});
		/*
		const savedGoal = localStorage.getItem(
			'calculate') ? JSON.parse(localStorage.getItem('calculate')) : [];
		localStorage.setItem('calculate', JSON.stringify(savedGoal));
    */
		console.log('this.state --->', this.state);
	}

	render() {
		console.log('the value of daily outside: ', this.daily);
		console.log('these are the props from editgoal: ', this.props);

		let { userId, title, category, currentBalance, goalTarget, image, _id } =
			this.props.goal[0];
		let calculate = this.state.calculate;
		let labels = ['Saved', 'Amount Left'];

		let dataAmount = [currentBalance, goalTarget];

		let data = {
			labels: labels,
			datasets: [
				{
					label: 'Categories',
					data: dataAmount,
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)',
					],
					borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
					borderWidth: 1,
				},
			],
		};

		let options = {
			plugins: {
				title: {
					display: true,
					position: 'top',
					text: 'Total Amount Saved',
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
				position: 'center',
			},
		};

		return (
			<Modal
				show={this.props.show}
				size="lg"
				onHide={() => this.props.handleClose()}
				aria-labelledby="example-modal-sizes-title-lg"
			>
				<Modal.Header closeButton>
					<Modal.Title id="example-modal-sizes-title-lg">
						<img src="$/{image}" />
						<h1>{title}</h1>
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<div id="left">
						<h6>{category}</h6>
						<hr />
						<h4>Saving Goal Target: {goalTarget}</h4>
						<h4>Current Amount: {currentBalance}</h4>
					</div>
					<div id="right">
						{' '}
						<div className="pieChart">
							<Pie options={options} data={data} />
							{currentBalance > 0 ? (
								<small>
									You've saved {currentBalance} out of {goalTarget}, only{' '}
									{goalTarget - currentBalance} to go!
								</small>
							) : (
								<small>Start saving now</small>
							)}
						</div>
					</div>
					<hr />
					<h5>
						<strong>Saving plan details</strong>
					</h5>
					<thead>
						<tr>
							<th>Saving interval</th>
							<th>Daily</th>
							<th>Weekly</th>
							<th>Bi-Weekly</th>
							<th>Monthly</th>
							<th>Yearly</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								Enter estimate weekly amount:{' '}
								<input
									type="number"
									name="calculate"
									value={calculate}
									placeholder="enter amount"
									max={goalTarget}
									onChange={(e) => {
										this.handleChange(e);
									}}
								></input>
							</td>
							<td>${Math.round(this.state.daily * 100) / 100}</td>
							<td>${Math.round(this.state.weekly || 0)}</td>
							<td>${Math.round(this.state.biWeekly * 100) / 100}</td>
							<td>${Math.round(this.state.monthly * 100) / 100}</td>
							<td>${Math.round(this.state.yearly * 100) / 100}</td>
						</tr>
					</tbody>
					<thead>
						<tr>
							<th>Time interval</th>
							<th>Days</th>
							<th>Weeks</th>
							<th>Bi-Weeks</th>
							<th>Months</th>
							<th>Years</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Time until goal is reached: </td>
							<td>{this.state.days}</td>
							<td>{this.state.weeks}</td>
							<td>{this.state.biWeeks}</td>
							<td>{this.state.months}</td>
							<td>{this.state.years}</td>
						</tr>
					</tbody>
				</Modal.Body>

				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={() => {
							this.props.handleClose();
						}}
					>
						Close
					</Button>
					<Button
						variant="primary"
						onClick={() => {
							this.props.handleClose();
						}}
					>
						Save changes
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		goal: state.goal,
	};
};

const mapDispatchToProps = (dispatch) => ({
	fetchGoal: (id) => dispatch(fetchSingleGoal(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditGoal);
