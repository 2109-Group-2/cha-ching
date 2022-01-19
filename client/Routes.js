import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import { me } from './store';
import Link from './components/Link';
import axios from 'axios';

import PropTypes from 'prop-types';
import auth from '../../SeniorPhase/Graceshopper/client/store/auth';
import Landing from './components/Landing';
import store from './store';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logout, setAuthToken } from './store/auth';
import Dashboard from './components/Dashboard';
import Accounts from './components/Accounts';

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
			<div>
				{auth.isAuthenticated ? (
					<Switch>
						<Route path="/home" component={Dashboard} />
						{this.state.access_token === null ? (
							<Dashboard />
						) : (
							<></>
						)}
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
		// Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
		// Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
		isLoggedIn: !!state.auth.id,
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
