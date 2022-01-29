import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTransactions, getAccounts } from '../store/plaid';
import { logout } from '../store';
import TransactionsTable from './TransactionsTable';
import SpendingPieChart from './SpendingPieChart';
import SpendingBarGraph from './SpendingBarChart';
import MostSpent from './MostSpent';
import Subscriptions from './Subscriptions';
import { Tabs, Tab } from 'react-bootstrap';
import moment from 'moment';

class Transactions extends Component {
	constructor() {
		super();
		this.state = {
			transactionsByDate: [],
			comparisonData: [],
		};
	}

	componentDidMount() {
		this.props.getAccounts(this.props.auth.user);
		this.props.getTransactions(this.props.auth.user);
	}

	render() {
		const { transactions, transactionsLoading, accounts } = this.props.plaid;
		const { transactionsByDate, comparisonData } = this.state;
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

		const today = moment().format('YYYY-MM-DD');
		const monthAgo = moment().subtract(1, 'months').format('YYYY-MM-DD');
		const twoMonthsAgo = moment().subtract(2, 'months').format('YYYY-MM-DD');
		const quarterAgo = moment().subtract(4, 'months').format('YYYY-MM-DD');
		const twoQuartersAgo = moment().subtract(8, 'months').format('YYYY-MM-DD');
		const yearAgo = moment().subtract(1, 'years').format('YYYY-MM-DD');
		const twoYearsAgo = moment().subtract(2, 'years').format('YYYY-MM-DD');

		let handleClick = (eventKey) => {
			if (eventKey === 'monthly') {
				this.setState({
					transactionsByDate: transactionsData.filter((data) =>
						moment(data.date).isBetween(monthAgo, today)
					),
					comparisonData: transactionsData.filter((data) =>
						moment(data.date).isBetween(twoMonthsAgo, monthAgo)
					),
				});
			} else if (eventKey === 'quarterly') {
				this.setState({
					transactionsByDate: transactionsData.filter((data) =>
						moment(data.date).isBetween(quarterAgo, today)
					),
					comparisonData: transactionsData.filter((data) =>
						moment(data.date).isBetween(twoQuartersAgo, quarterAgo)
					),
				});
			} else if (eventKey === 'yearly') {
				this.setState({
					transactionsByDate: transactionsData.filter((data) =>
						moment(data.date).isBetween(yearAgo, today)
					),
					comparisonData: transactionsData.filter((data) =>
						moment(data.date).isBetween(twoYearsAgo, yearAgo)
					),
				});
			} else if (eventKey === 'allTime') {
				this.setState({
					transactionsByDate: transactionsData,
					comparisonData: transactionsData,
				});
			}
		};

		return (
			<div className="transactionsComponent">
				<Tabs
					defaultActiveKey="allTime"
					id="uncontrolled-tab-example"
					className="mb-3"
					// justify
					onSelect={(eventKey) => {
						handleClick(eventKey);
					}}
					className="transactionsTabs"
				>
					<Tab eventKey="allTime" title="All Time"></Tab>
					<Tab eventKey="monthly" title="Monthly"></Tab>
					<Tab eventKey="quarterly" title="Quarterly"></Tab>
					<Tab eventKey="yearly" title="Yearly"></Tab>
				</Tabs>

				{/* I want to render the original data table first so that the charts aren't empty */}
				{transactionsData.length
					? transactionsByDate.length === 0
						? this.setState({
								transactionsByDate: transactionsData,
								comparisonData: transactionsData,
						  })
						: ''
					: ''}

				<h2>Transactions Breakdown</h2>

				{!transactionsData.length > 0 ? (
					<h4>You have not made any transactions</h4>
				) : (
					<>
					<h4>
						You have <b>{transactionsByDate.length}</b> transactions from your
						<b> {accounts.length}</b> linked
						{accounts.length > 1 ? ' accounts' : ' account'}
					</h4>
					<div className="chartsAndTables">
					<SpendingBarGraph
						transactionsByDate={transactionsByDate}
						comparisonData={comparisonData}
					/>
					<MostSpent transactionsByDate={transactionsByDate} />
					<Subscriptions transactionsData={transactionsData}/>
					<SpendingPieChart transactionsByDate={transactionsByDate} />
					<TransactionsTable transactionsByDate={transactionsByDate} />
				</div>
					</>
					
				)}
				
			</div>
		);
	}
}

Transactions.propTypes = {
	getTransactions: PropTypes.func.isRequired,
	plaid: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
};

const mapState = (state) => ({
	auth: state.auth,
	plaid: state.plaid,
});

const mapDispatch = (dispatch) => ({
	getTransactions: (userData) => dispatch(getTransactions(userData)),
	getAccounts: (userData) => dispatch(getAccounts(userData)),
});

export default connect(mapState, mapDispatch)(Transactions);
