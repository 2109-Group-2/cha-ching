import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAccounts, addAccount } from '../store/plaid';
import Accounts from './Accounts';
import Link from './Link';
import Transactions from './Transactions';

class Dashboard extends Component {
	componentDidMount() {
		this.props.getAccounts(this.props.auth.user);
	}

	// Add account
	handleOnSuccess = (token, metadata) => {
		const plaidData = {
			public_token: token,
			metadata: metadata,
		};
		this.props.addAccount(plaidData);
	};

	render() {
		const { user } = this.props.auth;
		const { accounts, accountsLoading } = this.props.plaid;
		let dashboardContent;

		if (accounts === null) {
			// this.props.getAccounts()
		} else if (accounts.length > 0) {
			// User has accounts linked
			dashboardContent = (
				<>
					<Accounts user={user} accounts={accounts} />
					<Transactions />
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
	addAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	plaid: PropTypes.object.isRequired,
};

const mapState = (state) => ({
	auth: state.auth,
	plaid: state.plaid,
});

const mapDispatch = (dispatch) => ({
	getAccounts: (userData) => dispatch(getAccounts(userData)),
	addAccount: (userData) => dispatch(addAccount(userData)),
});

export default connect(mapState, mapDispatch)(Dashboard);
