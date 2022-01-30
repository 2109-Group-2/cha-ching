import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import Transactions from './Transactions';
import {
	getSubscriptions,
	addSubscription,
	deleteSubscription,
} from '../store/auth';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import AddSubscription from './AddSubscription';
import SubscriptionTable from './SubscriptionTable';

class Subscriptions extends Component {
	constructor() {
		super();
		this.state = {
			show: false,
			name: '',
			accountName: '',
			startDate: '',
			frequency: 'Monthly',
			price: 0,
		};
		this.handleClose = this.handleClose.bind(this);
		this.handleShow = this.handleShow.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
	}

	componentDidMount() {
		this.props.getSubscriptions(this.props.auth.user);
	}
	handleClose() {
		this.setState({ show: false });
		this.props.getSubscriptions(this.props.auth.user);
	}
	handleShow() {
		this.setState({ show: true });
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleSelect(event) {
		this.setState({
			frequency: event.target.value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.addSubscription(this.props.auth.user.id, { ...this.state });
		console.log('Subscription to be added --->', { ...this.state });
		this.props.getSubscriptions(this.props.auth.user);
		this.setState({
			show: false,
			name: '',
			accountName: '',
			startDate: '',
			frequency: 'Monthly',
			price: 0,
		});
	}

	render() {
		const { subscriptions } = this.props.auth;
		return (
			<div className="pieChart">
				<h6>Your Subscriptions:</h6>
				{!subscriptions ? (
					<>
						<p>You do not currently have any subscriptions</p>
						<Button variant="warning" onClick={this.handleShow}>
							Add a Subscription
						</Button>

						<AddSubscription
							show={this.state.show}
							handleShow={this.handleShow}
							handleClose={this.handleClose}
						/>
					</>
				) : (
					<>
						<SubscriptionTable subscriptions={subscriptions} />
						<Button onClick={this.handleShow}>
							Add a Subscription
						</Button>
						<AddSubscription
							show={this.state.show}
							handleShow={this.handleShow}
							handleClose={this.handleClose}
						/>
					</>
				)}
			</div>
		);
	}
}

const mapState = (state) => ({
	auth: state.auth,
});

const mapDispatch = (dispatch) => ({
	getSubscriptions: (userData) => dispatch(getSubscriptions(userData)),
	deleteSubscription: (subscriptionData) =>
		dispatch(deleteSubscription(subscriptionData)),
	addSubscription: (userId, subscriptionData) =>
		dispatch(addSubscription(userId, subscriptionData)),
});

export default connect(mapState, mapDispatch)(Subscriptions);
