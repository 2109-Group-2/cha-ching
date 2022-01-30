import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useContext, useState } from 'react';

class UserSettings extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			file: '',
			fileName: '',
			email: '',
			password: '',
			password2: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
		console.log('this.state handleChange for image --->', this.state);
	}
	onChange(e) {
		this.setState({ [e.target.id]: e.target.files[0] });
		this.setState({ [e.target.id]: e.target.files[0].fileName });
		console.log('this.state onChange for image --->', this.state);
	}

	handleShow() {
		this.setState({ show: true });
	}
	handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData();
		formData.append('file', this.state.file);
		const editedUser = {
			name: this.state.name,
			image: this.state.file,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2,
		};
		console.log(editedUser);
		// this.props.registerUser(editedUser, this.props.history);
	}

	render() {
		let { name, image, email, password, password2 } = this.state;

		return (
			<>
				<Form onSubmit={this.handleSubmit}>
					<FormGroup>
						<FormControl
							type="file"
							placeholder="Choose file"
							name="file"
							value={this.fileName}
							onChange={(e) => this.handleChange(e)}
						/>
					</FormGroup>
					<FormGroup>
						<FormControl
							type="text"
							placeholder="Name *"
							name="name"
							value={name}
							onChange={(e) => this.handleChange(e)}
							required
						/>
					</FormGroup>
					<FormGroup>
						<FormControl
							type="email"
							placeholder="Email *"
							name="email"
							value={email}
							onChange={(e) => this.handleChange(e)}
							required
						/>
					</FormGroup>
					<FormGroup>
						<FormControl
							type="password"
							placeholder="password"
							name="password"
							value={password}
							onChange={(e) => this.handleChange(e)}
						/>
					</FormGroup>
					<FormGroup>
						<Form.Control
							type="password"
							placeholder="password2"
							name="password2"
							value={password2}
							onChange={(e) => this.handleChange(e)}
						/>
					</FormGroup>
					<Button variant="success" type="submit">
						Edit Information
					</Button>
				</Form>
				{/* <Modal show={this.show} onHide={this.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>Add Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddForm />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close Button
            </Button>
          </Modal.Footer>
        </Modal> */}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

const mapDispatchToProps = (dispatch) => ({
	// addGoal: (goal) => dispatch(addGoal(goal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);
