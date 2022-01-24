import React, { Component } from "react";
import { Form, FormGroup, FormControl, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { useContext, useState } from "react";

class UserDetails extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      image: "",
      email: "",
      password: "",
      password2: "",
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, redirect to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      image: this.state.image,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    console.log(newUser);
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    return (
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <FormControl
            type="text"
            placeholder="Name *"
            name="name"
            value={name}
            onChange={(e) => onInputChange(e)}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            type="image"
            placeholder="image"
            name="image"
            value={image}
            onChange={(e) => onInputChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            type="email"
            placeholder="Email *"
            name="email"
            value={email}
            onChange={(e) => onInputChange(e)}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            as="password"
            placeholder="password"
            rows={3}
            name="password"
            value={password}
            onChange={(e) => onInputChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Form.Control
            type="password"
            placeholder="password2"
            name="password2"
            value={password2}
            onChange={(e) => onInputChange(e)}
          />
        </FormGroup>
        <Button variant="success" type="submit" block>
          Edit Information
        </Button>
      </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
