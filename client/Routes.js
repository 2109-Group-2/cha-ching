import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import { me } from './store';
import PropTypes from 'prop-types';
import Landing from './components/Landing';
import store from './store';
import { setCurrentUser, logout, setAuthToken } from './store/auth';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';

/**
 * COMPONENT
 */
class Routes extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      access_token: null,
    };
  }

  render() {
    const { auth } = this.props;

		return (
			<div className='routes'>
				{auth.isAuthenticated ? (
					<Switch>
						<Route path="/dashboard" component={Dashboard} />
						<Route path="/transactions" component={Transactions} />
					</Switch>
				) : (
					<Switch>
						<Route path="/" exact component={Landing} />
						<Route path="/login" component={Login} />
						<Route path="/signup" component={Signup} />
					</Switch>
				)}
			</div>
		);
	}
}

/**
 * CONTAINER
 */

Routes.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapState = (state) => {
	return {
		auth: state.auth,
	};
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
