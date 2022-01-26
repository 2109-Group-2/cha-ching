import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { Modal } from "react-responsive-modal";
import { fetchGoals } from "../store/savingGoals";
import Swal from "sweetalert2";
import { Route, Link } from "react-router-dom";
import AddGoal from "./AddGoal";

// let goals = [
//   {
//     id: 1,
//     title: "something",
//     image:
//       "https://media.istockphoto.com/photos/margarita-flower-is-a-dense-inflorescence-blooming-in-the-spring-picture-id900553412",
//     currentBalance: 500,
//     goalTarget: 2000,
//   },
//   {
//     id: 2,
//     title: "something else",
//     image:
//       "https://i.pinimg.com/236x/6d/ce/df/6dcedf07124b6d8b4f8fdd542bfe85e4--white-flowers-beautiful-flowers.jpg",
//     currentBalance: 1500,
//     goalTarget: 3000,
//   },
//   {
//     id: 3,
//     title: "something else2",
//     image: "",
//     currentBalance: 0,
//     goalTarget: 1000,
//   },
// ];

class Savings extends Component {
  componentDidMount() {
    console.log("first ", this.props.goal);

    this.props.fetchGoals(this.props.auth.user.id);
    console.log("component did mount goals: ", this.props.auth);
  }

  render() {

    console.log('njdkmfksd');
    let goals = this.props.goal;
    let totalAmount = 0;
    goals.forEach((goal) => {
      totalAmount += goal.currentBalance;
    });
    let dollars = totalAmount;
    let numOfGoals = goals.length;
    console.log(dollars);
    return (
      <div>
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
                      // onClick={() => console.log('this runs when clicked')}
                      // onClick={() => <AddGoal />}
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
                        <button
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
                          Edit Goal Details
                        </button>
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
      </div>
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

// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { getAccounts, addAccount } from '../store/plaid';
// import Accounts from './Accounts';
// import Link from './Link';

// class SavingsCalculator extends Component {

// 	componentDidMount() {
// 		this.props.getAccounts(this.props.auth.user);
// 	}

// 	// Add account
// 	handleOnSuccess = (token, metadata) => {
// 		const plaidData = {
// 			public_token: token,
// 			metadata: metadata,
// 		};
// 		this.props.addAccount(plaidData);
// 	};

// 	render() {
//     conso
// 		const { user } = this.props.auth;
// 		const { savings } = user;
// 		const { accounts, accountsLoading } = this.props.plaid;
// 		let dashboardContent;

// 		if (!savings || savings.length < 0) {
//       start saving... there are no saving goals associated with this account
// 		} else if (accounts.length > 0 && !savings) {
// 			User has accounts linked
//       but has no goals saved
//       if user has account stored then calculate ased on their income
// 			dashboardContent = <Accounts user={user} accounts={accounts} />;
// 		} else {
// 			User has no accounts linked
// 			dashboardContent = (
// 				<div className="row dashboard-wrapper">
// 					{/* <img src={blob} alt="blob" className="blob" /> */}
// 					<div className="col s12 center-align">
// 						<div className="dashboard-wrapper">
// 							<h4>
// 								<b>Welcome,</b> {user.title.split(' ')[0]}
// 							</h4>
// 							<p className="flow-text grey-text text-darken-1">
// 								To get started, link your first bank account below.
// 							</p>
// 						</div>

// 						<div className="dashboard-wrapper">
// 							<Link />
// 						</div>
// 					</div>
// 				</div>
// 			);
// 		}
// 		return <div className="container">{dashboardContent}</div>;
// 	}
// }

// SavingsCalculator.propTypes = {
// 	getAccounts: PropTypes.func.isRequired,
// 	addAccount: PropTypes.func.isRequired,
// 	auth: PropTypes.object.isRequired,
// 	plaid: PropTypes.object.isRequired,
// };

// const mapState = (state) => ({
// 	auth: state.auth,
// 	plaid: state.plaid,
// });

// const mapDispatch = (dispatch) => ({
// 	getAccounts: (userData) => dispatch(getAccounts(userData)),
// 	addAccount: (userData) => dispatch(addAccount(userData)),
// });

// export default connect(mapState, mapDispatch)(SavingsCalculator);
/*
<div key={goal.id}>
                        <div className="app-sidebar-goal">
                          <div className="sidebar-goal-title">
                            <img src={goal.image} height="100px" />
                            <strong>{goal.title}</strong>
                            <button /*onClick={addNewGoal}> delete</button>
                          </div>
                          <p>{goal.currentBalance}</p>
                          <small>Last modified [date]</small>
                        </div>
                      </div>

*/
