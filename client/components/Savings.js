import React, { Component } from 'react';
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
			showEdit: false,
			showAdd: false,
			currentGoalId: '',
		};
		this.handleAddShow = this.handleAddShow.bind(this);
		this.handleEditShow = this.handleEditShow.bind(this);
		this.handleEditClose = this.handleEditClose.bind(this);
		this.handleAddClose = this.handleAddClose.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleEditClose() {
		this.setState({ showEdit: false });
	}
	handleAddClose() {
		this.setState({ showAdd: false });
	}

	handleEditShow(id) {
		this.setState({ showEdit: true, currentGoalId: id });
	}
	handleAddShow() {
		this.setState({ showAdd: true });
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
	}

	render() {
		console.log('inside savings: ', this.props.goal);
		let goals = this.props.goal;
		let totalAmount = 0;
		goals.forEach((goal) => {
			totalAmount += Number(goal.currentBalance);
		});
		let dollars = totalAmount;
		let numOfGoals = goals.length;
		return (
			<>
				<div className="transactionsComponent">
					{numOfGoals <= 0 ? (
						<>
							<h2>You have not added any goals. Get started!</h2>
							<OverlayTrigger
								overlay={<Tooltip id={`tooltip-top`}>Add Goal</Tooltip>}
							>
								<button
									onClick={() => {
										this.handleAddShow();
									}}
									className="btn btn-succes"
									data-toggle="modal"
								>
									<i className="material-icons">&#xe8ff;</i>
								</button>
							</OverlayTrigger>
							{this.state.showAdd && (
								<AddGoal
									show={this.state.showAdd}
									handleClose={this.handleAddClose}
								/>
							)}
						</>
					) : (
						<div className="flex">
							<h2>
								Currently saving ${dollars.toLocaleString()} per month towards{' '}
								{numOfGoals} goals
							</h2>{' '}
							<OverlayTrigger
								overlay={<Tooltip id={`tooltip-top`}>Add Goal</Tooltip>}
							>
								<button
									onClick={() => {
										this.handleAddShow();
									}}
									className="btn btn-succes"
									data-toggle="modal"
								>
									<i className="material-icons">&#xe146;</i>
								</button>
							</OverlayTrigger>
							{this.state.showAdd && (
								<AddGoal
									show={this.state.showAdd}
									handleClose={this.handleAddClose}
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
										<img
											src={`/images/${goal.image}`}
											height={'60px'}
											width={'60px'}
										/>
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
													this.handleEditShow(goal._id);
												}}
												className="btn btn-succes"
												data-toggle="modal"
											>
												<i className="material-icons">&#xe8ff;</i>
											</button>
										</OverlayTrigger>
										{this.state.showEdit && (
											<EditGoal
												id={this.state.currentGoalId}
												userId={this.props.auth.user.id}
												show={this.state.showEdit}
												handleClose={this.handleEditClose}
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
