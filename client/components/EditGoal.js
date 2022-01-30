import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useContext, useState } from 'react';
import { fetchGoals, fetchSingleGoal, deleteGoal } from '../store/savingGoals';
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
		this.handleDelete = this.handleDelete.bind(this);
		this.refreshPage = this.refreshPage.bind(this);
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
			days: (Math.round((goalTarget / (val / 7)) * 100) / 100).toLocaleString(),
			weeks: (Math.round((goalTarget / val) * 100) / 100).toLocaleString(),
			biWeeks: (
				Math.round((goalTarget / (val * 2)) * 100) / 100
			).toLocaleString(),
			months: (
				Math.round((goalTarget / (val * 4)) * 100) / 100
			).toLocaleString(),
			years: (
				Math.round((goalTarget / (val * 12)) * 100) / 100
			).toLocaleString(),
		});
		/*
		const savedGoal = localStorage.getItem(
			'calculate') ? JSON.parse(localStorage.getItem('calculate')) : [];
		localStorage.setItem('calculate', JSON.stringify(savedGoal));
    */
		console.log('this.state --->', this.state);
	}
	handleDelete(id) {
		let values = {
			userId: this.props.auth.user.id,
			id,
		};
		this.props.deleteGoal(values);
		this.refreshPage();
	}

	refreshPage() {
		this.props.handleClose();
		this.props.fetchGoals(this.props.auth.user.id);
		//	window.location.reload(false);
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
		console.log('this is image', '../public/images/' + image);
		return (
			<Modal
				backdrop="static"
				show={this.props.show}
				size="lg"
				onHide={() => this.props.handleClose()}
				aria-labelledby="example-modal-sizes-title-lg"
				id="modalEdit"
			>
				<Modal.Header closeButton onClick={() => this.refreshPage()}>
					<Modal.Title id="example-modal-sizes-title-lg contained-modal-title-vcenter">
						<div className="flex">
							<img src={`/images/${image}`} height={'60px'} width={'60px'} />
							<h1>{title}</h1>
						</div>
					</Modal.Title>
				</Modal.Header>

				<Modal.Body id="contained-modal-title-vcenter">
					<div id="left">
						<h6>{category}</h6>
						<hr />
						<h4>Saving Goal Target: {goalTarget.toLocaleString()}</h4>
						<h4>Current Amount: {currentBalance.toLocaleString()}</h4>
					</div>
					<div id="right">
						{' '}
						<div
							style={
								({ marginLeft: 'auto' },
								{ marginRight: 'auto' },
								{ width: '20em' },
								{ display: 'flex' },
								{ displayItems: 'center' })
							}
							className="pieChart"
						>
							<Pie options={options} data={data} />
							{currentBalance > 0 ? (
								<small>
									You've saved {currentBalance.toLocaleString()} out of{' '}
									{goalTarget.toLocaleString()}, only{' '}
									{(goalTarget - currentBalance).toLocaleString()} to go!
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
							<td>
								${(Math.round(this.state.daily * 100) / 100).toLocaleString()}
							</td>
							<td>${Math.round(this.state.weekly || 0).toLocaleString()}</td>
							<td>
								$
								{(Math.round(this.state.biWeekly * 100) / 100).toLocaleString()}
							</td>
							<td>
								${(Math.round(this.state.monthly * 100) / 100).toLocaleString()}
							</td>
							<td>
								${(Math.round(this.state.yearly * 100) / 100).toLocaleString()}
							</td>
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
							<td>{this.state.days || 0}</td>
							<td>{this.state.weeks || 0}</td>
							<td>{this.state.biWeeks || 0}</td>
							<td>{this.state.months || 0}</td>
							<td>{this.state.years || 0}</td>
						</tr>
					</tbody>
				</Modal.Body>
				<Modal.Footer>
					<Button
						onClick={() => {
							this.handleDelete(_id);
						}}
					>
						Delete
					</Button>
					<Button
						onClick={() => {
							this.refreshPage();
						}}
					>
						Close
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
	fetchGoals: (id) => dispatch(fetchGoals(id)),
	deleteGoal: (userData) => dispatch(deleteGoal(userData, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditGoal);
