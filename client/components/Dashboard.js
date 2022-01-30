import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAccounts, setItem, getTransactions } from '../store/plaid';
import { setCurrentUser } from '../store';
import Accounts from './Accounts';
import Link from './Link';
import Transactions from './Transactions';
import MiniTransaction from './MiniTransaction';
import jwtDecode from 'jwt-decode';
import { Carousel, Row, Col } from 'react-bootstrap';
import MiniSavings from './MiniSavings';

// const token = localStorage.getItem('token');
// const decoded = jwtDecode(token);

class Dashboard extends Component {
	componentDidMount() {
		// this.props.loadInitialData(decoded)
		this.props.getAccounts(this.props.auth.user);
		this.props.getTransactions(this.props.auth.user);
	}

	// Add account
	handleOnSuccess = (token, metadata) => {
		const plaidData = {
			public_token: token,
			metadata: metadata,
		};
		this.props.setItem(plaidData);
	};

	render() {
		const { user } = this.props.auth;
		const { accounts, transactions } = this.props.plaid;
		let dashboardContent;
		if (accounts === null) {
			// this.props.getAccounts()
		} else if (accounts.length > 0) {
			// User has accounts linked
			dashboardContent = (
				<>
					<Row xs={1} md={2} className="g-4">
						<Col>
							<Accounts user={user} accounts={accounts} />
						</Col>
						<Col>
							<MiniSavings />
						</Col>
						<Col>
							<MiniTransaction transactions={transactions} />
						</Col>
					</Row>
				</>
			);
		} else {
			// User has no accounts linked
			dashboardContent = (
				<div>
					<div>
						<div>
							<h4>
								<b>Welcome,</b> {user.name.split(' ')[0]}
							</h4>
							<p className="flow-text grey-text text-darken-1">
								To get started, link your first bank account below.
							</p>
						</div>
						<div className="dashboard-wrapper">
							<Link />
						</div>
					</div>
				</div>
			);
		}
		return <div className="container">{dashboardContent}</div>;
	}
}

Dashboard.propTypes = {
	getAccounts: PropTypes.func.isRequired,
	setItem: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	plaid: PropTypes.object.isRequired,
};

const mapState = (state) => ({
	auth: state.auth,
	plaid: state.plaid,
});

const mapDispatch = (dispatch) => ({
	getTransactions: (userData) => dispatch(getTransactions(userData)),
	getAccounts: (userData) => dispatch(getAccounts(userData)),
	setItem: (userData) => dispatch(setItem(userData)),
	loadInitialData: (token) => dispatch(setCurrentUser(token)),
});

export default connect(mapState, mapDispatch)(Dashboard);
