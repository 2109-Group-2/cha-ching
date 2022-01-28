import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAccounts, setItem, getTransactions } from '../store/plaid';
import Accounts from './Accounts';
import Link from './Link';
import Transactions from './Transactions';
import MiniTransaction from './MiniTransaction';

class Dashboard extends Component {
	componentDidMount() {
		this.props.getAccounts(this.props.auth.user);
		this.props.getTransactions(this.props.auth.user);
		// console.log('<--- Transactions in Dashboard --->', this.props.plaid.transactions)
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
		if (accounts.length > 0 && transactions.length > 0) {
			// User has accounts linked
			dashboardContent = (
				<div className="dashComponent">
					<Accounts user={user} accounts={accounts} />
					<MiniTransaction transactions={transactions} />
				</div>
			);
		} else {
			// User has no accounts linked or transactions
			dashboardContent = (
				<div>
					<h4>
						<b>Welcome,</b> {user.name.split(' ')[0]}
					</h4>
					<p className="flow-text grey-text text-darken-1">
						To get started, link your first bank account below.
					</p>
					<Link />
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
});

export default connect(mapState, mapDispatch)(Dashboard);
