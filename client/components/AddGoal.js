
import React, { Component } from "react";
import { Form, FormGroup, FormControl, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { useContext, useState } from "react";
import { addGoal, fetchGoals } from "../store/savingGoals";

class AddGoal extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      image: "",
      // category: "other",
      currentBalance: 0,
      goalTarget: 0,
      // showForm: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.addGoal({ ...this.state }, this.props.auth.user.id);
    this.props.fetchGoal(this.props.auth.user.id);
    this.setState({
      title: "",
      image: "",
      // category: "other",
      currentBalance: 0,
      goalTarget: 0,
    });
  }

  handleSelect(event) {
    this.setState({
      category: event.target.value,
    });
  }
  render() {
    console.log("user id addgoal: ", this.props.auth.user.id);
    let { title, image, category, currentBalance, goalTarget } = this.state;
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
            value={image}
            onChange={(e) => this.handleChange(e)}
          />
        </FormGroup>
        <FormGroup className="mb-3">
          <Form.Label>Saving Goal?</Form.Label>
          <Form.Select defaultValue="Other" aria-label="category">
            <option>select menu</option>
            <option value={category}>Babies and Kids</option>
            <option value={category}>Bills and Taxes</option>
            <option value={category}>Electronics</option>
            <option value={category}>Gifts and Shopping</option>
            <option value={category}>Wedding</option>
            <option value={category}>Furniture</option>
            <option Default value={category}>
              Other
            </option>
            onChange={(e) => this.handleSelect(e)}
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
            placeholder={10}
            min={10}
            name="goalTarget"
            value={goalTarget}
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
  addGoal: (goal, userId) => dispatch(addGoal(goal, userId)),
  fetchGoal: (id) => dispatch(fetchGoals(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddGoal);
