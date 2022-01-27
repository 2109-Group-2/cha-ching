import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useContext, useState } from 'react';
import { addGoal, fetchGoals } from '../store/savingGoals';

class AddGoal extends Component {
	constructor() {
		super();
		this.state = {
			title: '',
			image: '',
			category: '',
			currentBalance: 0,
			goalTarget: 0,
			// showForm: false,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
		console.log('this.state --->', this.state);
	}

	onChange(e) {
		this.setState({ [e.target.id]: e.target.files[0] });
		this.setState({ [e.target.id]: e.target.files[0].imageName });
		console.log('this.state onChange for image --->', this.state);
	}
	handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData();
		formData.append('file', this.state.image);
		console.log('******************************component', [
			...formData.entries(),
		]);
		this.props.addGoal({ ...this.state }, this.props.auth.user.id, formData);
		this.props.fetchGoal(this.props.auth.user.id);
		const newGoal = {
			name: this.state.name,
			image: this.state.image,
			category: this.state.category,
			currentBalance: this.state.currentBalance,
			goalTarget: this.state.goalTarget,
		};
		console.log(newGoal);
		this.setState({
			title: '',
			image: '',
			category: '',
			currentBalance: 0,
			goalTarget: 1000,
		});
	}

	handleSelect(event) {
		this.setState({
			category: event.target.value,
		});
		console.log('this.state handleSelect for category --->', this.state);
	}
	render() {
		let { title, category, currentBalance, goalTarget } = this.state;
		return (
			<div className="col s12 accounts-wrapper">
				<Form onSubmit={this.handleSubmit}>
					<FormGroup className="mb-3">
						<FormControl
							type="text"
							placeholder="title"
							name="title"
							value={title}
							onChange={(e) => this.handleChange(e)}
							required
						/>
					</FormGroup>
					<FormGroup className="mb-3">
						<FormControl
							type="file"
							placeholder="image"
							name="image"
							value={this.fileName}
							onChange={(e) => this.handleChange(e)}
						/>
					</FormGroup>
					<FormGroup className="mb-3">
						<Form.Label>Saving Goal?</Form.Label>
						<Form.Select defaultValue="Other" aria-label="category" onChange={(e) => this.handleSelect(e)} >
							<option value="Babies and Kids">Babies and Kids</option>
							<option value="Bills and Taxes">Bills and Taxes</option>
							<option value="Electronics">Electronics</option>
							<option value="Gifts and Shopping">Gifts and Shopping</option>
							<option value="Wedding">Wedding</option>
							<option value="Furniture">Furniture</option>
							<option Default value="Other">
								Other
							</option>
						</Form.Select>
					</FormGroup>

					<FormGroup className="mb-3">
						<Form.Label>Current Amount Saved</Form.Label>
						<Form.Control
							type="number"
							placeholder="Balace"
							name="currentBalance"
							value={currentBalance}
							onChange={(e) => this.handleChange(e)}
						/>
					</FormGroup>
					<FormGroup className="mb-3">
						<Form.Label>Goal Target</Form.Label>
						<Form.Control
							type="number"
							placeholder={1000}
							min={10}
							name="goalTarget"
							value={goalTarget || 1000}
							onChange={(e) => this.handleChange(e)}
							required
						/>
						<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
						<Form.Control.Feedback type="invalid">
							Please provide a valid zip.
						</Form.Control.Feedback>
					</FormGroup>

					<Button variant="success" type="submit">
						Add Goal
					</Button>
				</Form>
			</div>
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
	addGoal: (goal, userId, formData) =>
		dispatch(addGoal(goal, userId, formData)),
	fetchGoal: (id) => dispatch(fetchGoals(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddGoal);
