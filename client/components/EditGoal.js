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
	/*
		this.state = {
			title: this.props.goal.title || '',
			image: this.props.goal.image || '',
			category: this.props.goal.category || '',
			currentBalance: this.props.goal.currentBalance || 0,
			goalTarget: this.props.goal.goalTarget || 0,
			// showForm: false,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
	}
*/
	componentDidMount() {
		console.log(' this.props.fetchGoal: ', this.props.userId, this.props.id);
		let values = {
			userId: this.props.userId,
			id: this.props.id,
		};
		this.props.fetchGoal(values);
	}

	/*
	componentDidUpdate(prevProps) {
    if(prevProps._id !== this.props.goal.id){
      this.setState({
        title: this.props.goal.title || '',
        image: this.props.goal.image || '',
        category: this.props.goal.category || '',
        currentBalance: this.props.goal.currentBalance || 0,
        goalTarget: this.props.goal.goalTarget || 0,

      })
    }
  }

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
		console.log('this.state --->', this.state);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.files[0] });
		// this.setState({ [e.target.id]: e.target.files[0].imageName });
		console.log('this.state onChange for image --->', this.state);
	}
	handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData();
		formData.append('file', this.state.image);
		formData.append('title', this.state.title);
		formData.append('category', this.state.category);
		formData.append('currentBalance', this.state.currentBalance);
		formData.append('goalTarget', this.state.goalTarget);
		console.log('******************************component', [
			...formData.entries(),
		]);
		this.props.updateGoal({ ...this.state }, this.props.auth.user.id, formData);


	}

	handleSelect(event) {
		this.setState({
			category: event.target.value,
		});
		console.log('this.state handleSelect for category --->', this.state);
	}
  */

	render() {
		console.log('these are the props from editgoal: ', this.props);

		let { userId, title, category, currentBalance, goalTarget, image, _id } =
			this.props.goal[0];

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
							/**halfway there... making great progress or almost done
							currentBalance** */
							<small></small>
						</div>
					</div>
					<hr />
					<h5>Saving plan details</h5>
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
							<td>Enter estimate weekly amount: [100]</td>
							<td>$14.3</td>
							<td>$100</td>
							<td>$200</td>
							<td>$400</td>
							<td>4,800</td>
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
							<td>180</td>
							<td>26</td>
							<td>12</td>
							<td>5</td>
							<td>0</td>
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
			/*
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
							value={this.file}
							onChange={(e) => this.onChange(e)}
						/>
					</FormGroup>
					<FormGroup className="mb-3">
						<Form.Label>Saving Goal?</Form.Label>
						<Form.Select
							defaultValue="Other"
							aria-label="category"
							onChange={(e) => this.handleSelect(e)}
						>
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
      */
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
