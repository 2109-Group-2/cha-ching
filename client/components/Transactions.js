import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTransactions, addAccount, deleteAccount } from '../store/plaid';
import { logout } from '../store';
import TransactionsTable from './TransactionsTable';
import SpendingPieChart from './SpendingPieChart';
import SpendingBarGraph from './SpendingBarChart';

class Transactions extends Component {
	componentDidMount() {
		const { accounts } = this.props.plaid;
		this.props.getTransactions(accounts);
	}

	render() {
		const { transactions, transactionsLoading, accounts } = this.props.plaid;

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
			<div className='transactionsComponent'>
				<h3>
					<b>Transactions</b>
				</h3>

				{!transactions ? (
					<></>
				) : (
					<p>
						You have <b>{transactionsData.length}</b> transactions from your
						<b> {accounts.length}</b> linked
						{accounts.length > 1 ? (
							<span> accounts </span>
						) : (
							<span> account </span>
						)}
						from the past 30 days{' '}
					</p>
				)}
        <div className='chartsAndTables'>
          <SpendingBarGraph transactionsData={transactionsData} />
				<SpendingPieChart transactionsData={transactionsData} />
				<TransactionsTable
					transactions={transactions}
					transactionsLoading={transactionsLoading}
				/>
        </div>
				
			</div>
		);
	}
}

Transactions.propTypes = {
	logout: PropTypes.func.isRequired,
	getTransactions: PropTypes.func.isRequired,
	addAccount: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	accounts: PropTypes.array.isRequired,
	plaid: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
};

const mapState = (state) => ({
	auth: state.auth,
	plaid: state.plaid,
});

const mapDispatch = (dispatch) => ({
	logout: (userData) => dispatch(logout(userData)),
	getTransactions: (userData) => dispatch(getTransactions(userData)),
	addAccount: (userData) => dispatch(addAccount(userData)),
	deleteAccount: (userData) => dispatch(deleteAccount(userData)),
});

export default connect(mapState, mapDispatch)(Transactions);
