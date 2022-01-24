import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTransactions, addAccount, deleteAccount } from '../store/plaid';
import { logout } from '../store';
import Link from './Link';
import TransactionsTable from './TransactionsTable';

class Accounts extends Component {
	componentDidMount() {
		const { accounts } = this.props;
		this.props.getTransactions(accounts);
	}

	// Add account
	handleOnSuccess = (token, metadata) => {
		const { accounts } = this.props;
		const plaidData = {
			public_token: token,
			metadata: metadata,
			accounts: accounts,
		};
		this.props.addAccount(plaidData);
	};

	// Delete account
	onDeleteClick = (id) => {
		const { accounts } = this.props;
		const accountData = {
			id: id,
			accounts: accounts,
		};
		this.props.deleteAccount(accountData);
	};

	// Logout
	onLogoutClick = (e) => {
		e.preventDefault();
		this.props.logout();
	};

	render() {
		const { user, accounts } = this.props;
		const { transactions, transactionsLoading } = this.props.plaid;

		let accountItems = accounts.map((account) => (
			<p key={account._id}>
				<button
					onClick={this.onDeleteClick.bind(this, account._id)}
					className="btn btn-small btn-floating  btn-delete"
				>
					<i className="material-icons">clear</i>
				</button>
				<b>{account.institutionName}</b>
			</p>
		));

		return (
			<div>
				<div className="col s12 accounts-wrapper">
					<div>
						<h2>Linked Accounts</h2>

						<p className="grey-text text-darken-1">
							Welcome back, <b>{user.name.split(' ')[0]}</b>. Add or remove your
							bank accounts below.
						</p>
					</div>

					<div className="linked-accounts">
						<h6>Your Linked Accounts:</h6>
						<p>{accountItems}</p>
					</div>
					<Link />
					<hr />
				</div>
			</div>
		);
	}
}

Accounts.propTypes = {
  logout: PropTypes.func.isRequired,
  getTransactions: PropTypes.func.isRequired,
  addAccount: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  accounts: PropTypes.array.isRequired,
  plaid: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapState = (state) => ({
  plaid: state.plaid,
});

const mapDispatch = (dispatch) => ({
  logout: (userData) => dispatch(logout(userData)),
  getTransactions: (userData) => dispatch(getTransactions(userData)),
  addAccount: (userData) => dispatch(addAccount(userData)),
  deleteAccount: (userData) => dispatch(deleteAccount(userData)),
});

export default connect(mapState, mapDispatch)(Accounts);
