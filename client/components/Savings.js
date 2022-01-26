import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { fetchGoals } from "../store/savingGoals";
import Swal from "sweetalert2";
import { Route, Link } from "react-router-dom";
import AddGoal from "./AddGoal";

class Savings extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  componentDidMount() {
    this.props.fetchGoals(this.props.auth.user.id);
  }

  render() {
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
                    <button
                      className="AddGoalButton"
                    >
                      <Link to="/addGoal">+ add a goal</Link>
                    </button>
                  </div>
                  {goals.map((goal) => {
                    return (
                      <div className="goal">
                        <div className="goal-left"></div>
                        <div className="goal-body" key={goal.id}>
                          <img
                            src={
                              goal.image ||
                              "https://m.media-amazon.com/images/I/41WPpgz6FYL._AC_SL1200_.jpg"
                            }
                            style={({ width: "200px" }, { height: "100px" })}
                          />
                          <div className="goal-info">
                            <div className="goal-info-inner">
                              <p className="goal-title ellipsis">
                                {goal.title}
                              </p>
                              <p className="goal-progress adjust-hide">
                                <strong className="goal-current-currentBalance">
                                  ${goal.currentBalance}
                                </strong>{" "}
                                of{" "}
                                <strong className="goal-target-currentBalance">
                                  ${goal.goalTarget}
                                </strong>
                              </p>
                              <p className="goal-calculated adjust-only"></p>
                            </div>
                          </div>
                        </div>
                        <Button
                          className="btn btn-success"
                          data-toggle="modal"
                          className="view-details-tab"
                          onClick={async () => {
                            const { value: file } = await Swal.fire({
                              title: `${goal.title}`,
                              text: `$${goal.currentBalance} of $${goal.goalTarget}`,
                              imageUrl: `${goal.image}`,
                              input: "file",
                              inputAttributes: {
                                accept: "image/*",
                                "aria-label": "Upload your goal picture",
                              },
                              imageWidth: 200,
                              imageHeight: 200,
                              width: 600,
                              padding: "3em",
                              color: "rgba(0,0,0, 1)",
                              background:
                                "#fff url(https://quidsinmagazine.com/wp-content/uploads/2018/11/bigstock-Pink-Piggy-Bank-On-Color-Backg-253177441-900x450.jpg)",
                              backdrop: `rgba(208,208,208, 0.84)`,
                            });
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (e) => {
                                goals.image = e.target.result;
                              };
                              console.log("this is value.file: ", file);
                              reader.readAsDataURL(file);
                            }
                          }}
                        >
                          <i className="material-icons">&#xE147;</i>
                          <span>Edit Goal</span>
                        </Button>
                        <div className="goal-right"></div>
                      </div>
                    );
                  })}
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

const mapDispatch = (dispatch) => ({
  fetchGoals: (userId) => dispatch(fetchGoals(userId)),
  // addAccount: (userData) => dispatch(addAccount(userData)),
});

export default connect(mapState, mapDispatch)(Savings);
