import React, { Component } from 'react';
import browserHistory from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
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
				<div className="flex">
					<div className="app-sidebar">
						<div className="app-sidebar-header">
							{numOfGoals <= 0 ? (
								<>
									<h2>You have not added any goals. Get started!</h2>
									<button className="AddGoalButton">
										<Link to="/addGoal">+ add a goal</Link>
									</button>
								</>
							) : (
								<>
									<div className="flex">
										<h2>
											Currently saving ${dollars.toLocaleString()} per month
											towards {numOfGoals} goals
										</h2>
										<button className="AddGoalButton">
											<Link to="/addGoal">+ add a goal</Link>
										</button>
									</div>
									{goals.map((goal) => {
										return (
											<div className="goal">
												<div className="goal-left"></div>
												<div className="goal-body" key={goal._id}>
													<img
														src={
															'/images/' + goal.image ||
															'https://m.media-amazon.com/images/I/41WPpgz6FYL._AC_SL1200_.jpg'
														}
														style={({ width: '200px' }, { height: '100px' })}
													/>
													<div className="goal-info">
														<div className="goal-info-inner">
															<p className="goal-title ellipsis">
																{goal.title}
															</p>
															<p className="goal-progress adjust-hide">
																<strong className="goal-current-currentBalance">
																	${goal.currentBalance}
																</strong>{' '}
																of{' '}
																<strong className="goal-target-currentBalance">
																	${goal.goalTarget}
																</strong>
															</p>
															<p className="goal-calculated adjust-only"></p>
														</div>
													</div>
												</div>
												<Button
													onClick={() => {
														this.handleShow(goal._id);
													}}
												>
													Edit Goal
												</Button>{' '}
												<Button
													onClick={() => {
														this.handleDelete(goal._id);
													}}
												>
													Delete Goal
												</Button>
												<div className="goal-right"></div>
											</div>
										);
									})}
									{this.state.show && (
										<EditGoal
											id={this.state.currentGoalId}
											userId={this.props.auth.user.id}
											show={this.state.show}
											handleClose={this.handleClose}
										/>
									)}
								</>
							)}
						</div>
						<div className="app-sidebar-goals"></div>
					</div>
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
