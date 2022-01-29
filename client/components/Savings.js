import React, { Component } from 'react';
import browserHistory from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	Form,
	FormGroup,
	FormControl,
	Button,
	FloatingLabel,
	Modal,
	OverlayTrigger,
	Tooltip,
} from 'react-bootstrap';
import { fetchGoals, deleteGoal } from '../store/savingGoals';
import Swal from 'sweetalert2';
import { Route, Link } from 'react-router-dom';
import AddGoal from './AddGoal';
import EditGoal from './EditGoal';

class Savings extends Component {
	constructor() {
		super();
		this.state = {
			show: false,
			currentGoalId: '',
		};
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleClose() {
		this.setState({ show: false });
	}

	handleShow(id) {
		this.setState({ show: true, currentGoalId: id });
	}
	componentDidMount() {
		this.props.fetchGoals(this.props.auth.user.id);
	}

	handleDelete(id) {
		let values = {
			userId: this.props.auth.user.id,
			id,
		};
		this.props.deleteGoal(values);
		browserHistory.push('/savings');
	}

	render() {
		console.log('inside savings: ', this.props.goal);
		let goals = this.props.goal;
		let totalAmount = 0;
		goals.forEach((goal) => {
			totalAmount += goal.currentBalance;
		});
		let dollars = totalAmount;
		let numOfGoals = goals.length;
		return (
			<>
      <div className='middle'>
					{numOfGoals <= 0 ? (
						<>
							<h2>You have not added any goals. Get started!</h2>
							<button
								onClick={() => {
									this.handleShow();
								}}
							>
								View Goal
							</button>
							{this.state.show && (
								<AddGoal
									show={this.state.show}
									handleClose={this.handleClose}
								/>
							)}
						</>
					) : (
						<div className="flex">
							<h2 >
								Currently saving ${dollars.toLocaleString()} per month towards{' '}
								{numOfGoals} goals
							</h2>
							<button
								onClick={() => {
									this.handleShow();
								}}
							>
								Add Goal
							</button>
							{this.state.show && (
								<AddGoal
									show={this.state.show}
									handleClose={this.handleClose}
								/>
							)}
						</div>
					)}
					<table className="table table-striped table-hover">
						<thead>
							<tr>
								<th>Image</th>
								<th>Title</th>
								<th>Category</th>
								<th>Goal Target</th>
								<th>Currently Saved</th>
							</tr>
						</thead>
						<tbody>
							{goals.map((goal) => (
								<tr key={goal._id}>
									<td>
										<img src={goal.image} height={'60px'} width={'60px'} />
									</td>
									<td>{goal.title}</td>
									<td>{goal.category}</td>
									<td>{goal.goalTarget}</td>
									<td>{goal.currentBalance}</td>
									<td>
										<OverlayTrigger
											overlay={
												<Tooltip id={`tooltip-top`}>Click to view</Tooltip>
											}
										>
											<button
												onClick={() => {
													this.handleShow(goal._id);
												}}
												className="btn btn-succes"
												data-toggle="modal"
											>
												<i className="material-icons">&#xe8ff;</i>
											</button>
										</OverlayTrigger>
										{this.state.show && (
											<EditGoal
												id={this.state.currentGoalId}
												userId={this.props.auth.user.id}
												show={this.state.show}
												handleClose={this.handleClose}
											/>
										)}
										<OverlayTrigger
											overlay={<Tooltip id={`tooltip-top`}>Delete</Tooltip>}
										>
											<button
												className="btn btn-succes"
												data-toggle="modal"
												onClick={() => this.handleDelete(goal._id)}
											>
												<i className="material-icons">&#xE872;</i>
											</button>
										</OverlayTrigger>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					)
          </div>
			</>
		);
	}
}

const mapState = (state) => ({
	auth: state.auth,
	goal: state.goal,
});

const mapDispatch = (dispatch, { history }) => ({
	fetchGoals: (userId) => dispatch(fetchGoals(userId)),
	deleteGoal: (userData) => dispatch(deleteGoal(userData, history)),
	// addAccount: (userData) => dispatch(addAccount(userData)),
});

export default connect(mapState, mapDispatch)(Savings);
