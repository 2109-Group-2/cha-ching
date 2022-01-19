import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import PlaidLinkButton from 'react-plaid-link-button'
import { connect } from 'react-redux';
import { getTransactions, addAccount, deleteAccount } from '../store/plaid';
import { logout } from '../store';
import MaterialTable from 'material-table'
import Link from './Link';

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

		// Setting up data table
		const transactionsColumns = [
			{ title: 'Account', field: 'account' },
			{ title: 'Date', field: 'date', type: 'date', defaultSort: 'desc' },
			{ title: 'Name', field: 'name' },
			{ title: 'Amount', field: 'amount' },
			{ title: 'Category', field: 'category' },
		];

		let transactionsData = [];

		transactions.forEach(function (account) {
			account.transactions.forEach(function (transaction) {
				transactionsData.push({
					account: account.accountName,
					date: transaction.date,
					category: transaction.category[0],
					name: transaction.name,
					amount: transaction.amount,
				});
			});
		});

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

					<h5>
						<b>Transactions</b>
					</h5>

					{transactionsLoading ? (
						<p className="grey-text text-darken-1">Fetching transactions...</p>
					) : (
						<>
							<div className="grey-text text-darken-1 num-of-transactions">
								You have <b>{transactionsData.length}</b> transactions from your
								<b> {accounts.length}</b> linked
								{accounts.length > 1 ? (
									<span> accounts </span>
								) : (
									<span> account </span>
								)}
								from the past 30 days
							</div>

              <MaterialTable
                  columns={transactionsColumns}
                  data={transactionsData}
                  title='Search Transactions'
                />

							{/* <table>
								<thead>
									<tr>
										<th scope="col">Account</th>
										<th scope="col">Transaction</th>
										<th scope="col">Date of Transaction</th>
										<th scope="col">Amount</th>
										<th scope="col">Category</th>
									</tr>
								</thead>
								<tbody>
										<th scope="row">1</th>
										{transactionsData.map((data) => {
											return (
                        <>
                          <tr key={data.id}>
                      <td>{data.account}</td>
                      <td>{data.name}</td>
                      <td>{data.date}</td>
                      <td>${data.amount}</td>
                      <td>{data.category}</td>
                      </tr>
                        </>
                        
                      );
										})}
								</tbody>
							</table> */}

							<table
								columns={transactionsColumns}
								data={transactionsData}
								title="Search Transactions"
							/>
						</>
					)}
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
