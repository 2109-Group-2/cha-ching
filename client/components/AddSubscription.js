import React, { Component } from 'react';
import { connect } from 'react-redux';
import Transactions from './Transactions';
import { getSubscriptions, addSubscription } from '../store/auth';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

class AddSubscription extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
			name: '',
			accountName: '',
			startDate: '',
			frequency: 'Monthly',
			price: 0,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
	}

	componentDidMount() {
		this.props.getSubscriptions(this.props.auth.user);
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

		this.setState({
			show: false,
			name: '',
			accountName: '',
			startDate: '',
			frequency: 'Monthly',
			price: 0,
		});
		this.props.handleClose();
		this.props.getSubscriptions(this.props.auth.user);
	}

	render() {
		return (
			<div>
				<Modal show={this.props.show} onHide={this.props.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Add a Subscription</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form onSubmit={this.handleSubmit}>
							<Form.Group as={Row} className="mb-3" controlId="name">
								<Form.Label column sm={2}>
									Subscription Name
								</Form.Label>
								<Col sm={9}>
									<Form.Control
										type="string"
										name="name"
										placeholder="Enter Subscription Name"
										onChange={(e) => this.handleChange(e)}
										required
									/>
								</Col>
							</Form.Group>

							<Form.Group as={Row} className="mb-3" controlId="accountName">
								<Form.Label column sm={2}>
									Account Name
								</Form.Label>
								<Col sm={9}>
									<Form.Control
										type="string"
										name="accountName"
										placeholder="Account Name"
										onChange={(e) => this.handleChange(e)}
										required
									/>
									<Form.Text className="text-muted">
										Enter the Bank Account that is linked to this Subscription.
									</Form.Text>
								</Col>
							</Form.Group>

							<Form.Group as={Row} className="mb-3" controlId="startDate">
								<Form.Label column sm={2}>
									Startdate
								</Form.Label>
								<Col sm={9}>
									<Form.Control
										type="date"
										name="startDate"
										placeholder="Date the Subscription Starts"
										onChange={(e) => this.handleChange(e)}
										required
									/>
									<Form.Text className="text-muted">
										Date the Subscription Starts
									</Form.Text>
								</Col>
							</Form.Group>

							<Form.Group as={Row} className="mb-3">
								<Form.Label column sm={2}>
									Subscription Frequency
								</Form.Label>
								<Col sm={9}>
									<Form.Select
										aria-label="Default select example"
										name="frequency"
										onChange={(e) => this.handleSelect(e)}
									>
										<option value="Monthly">Monthly</option>
										<option value="Weekly">Weekly</option>
										<option value="Bi-Weekly">Bi-Weekly</option>
										<option value="Yearly">Yearly</option>
										<option value="Daily">Daily</option>
										<option value="Quaterly">Quaterly</option>
									</Form.Select>
								</Col>
							</Form.Group>

							<Form.Group as={Row} className="mb-3" controlId="price">
								<Form.Label column sm={2}>
									Price of Subscription
								</Form.Label>
								<Col sm={9}>
									<Form.Control
										type="number"
										name="price"
										placeholder="Price of the Subscription"
										onChange={(e) => this.handleChange(e)}
										required
									/>
									<Form.Text className="text-muted">
										Price of the Subscription
									</Form.Text>
								</Col>
							</Form.Group>

							<Form.Group as={Row} className="mb-3">
								<Col sm={{ span: 9, offset: 3 }}>
									<Button type="submit">
										Submit
									</Button>
								</Col>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.props.handleClose}>
							Cancel
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

const mapState = (state) => ({
	auth: state.auth,
});

const mapDispatch = (dispatch) => ({
	getSubscriptions: (userData) => dispatch(getSubscriptions(userData)),
	addSubscription: (userId, subscriptionData) =>
		dispatch(addSubscription(userId, subscriptionData)),
});

export default connect(mapState, mapDispatch)(AddSubscription);
