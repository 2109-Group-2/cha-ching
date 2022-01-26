import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setItem, deleteAccount } from '../store/plaid';
import { logout } from '../store';
import Link from './Link';
import TransactionsTable from './TransactionsTable';
import { Accordion, Card, Button } from 'react-bootstrap';

class Accounts extends Component {
	// componentDidMount() {
	// 	const { accounts } = this.props;
	// }

	// Add account
	// handleOnSuccess = (token, metadata) => {
	// 	const { accounts } = this.props;
	// 	const plaidData = {
	// 		public_token: token,
	// 		metadata: metadata,
	// 		accounts: accounts,
	// 	};
	// 	this.props.setItem(plaidData);
	// };

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
	// onLogoutClick = (e) => {
	// 	e.preventDefault();
	// 	this.props.logout();
	// };

	render() {
		const { user, accounts } = this.props;
		const { transactions, transactionsLoading } = this.props.plaid;

		let checkingAccountItems = accounts
			.filter((account, i) => {
				return account.accountSubtype === 'checking';
			})
			.map((account) => (
				<p key={account._id}>
					<Button
						onClick={this.onDeleteClick.bind(this, account._id)}
						variant="danger"
					>
						X
					</Button>
					<inline>
						{account.institutionName} - {account.accountName}
					</inline>
				</p>
			));

		let creditAccountItems = accounts
			.filter((account, i) => {
				return account.accountSubtype === 'credit card';
			})
			.map((account) => (
				<p key={account._id}>
					<Button
						onClick={this.onDeleteClick.bind(this, account._id)}
						variant="danger"
					>
						X
					</Button>
					<inline>
						{account.institutionName} - {account.accountName}
					</inline>
				</p>
			));

		let savingsAccountItems = accounts
			.filter((account, i) => {
				return account.accountSubtype === 'savings';
			})
			.map((account) => (
				<p key={account._id}>
					<Button
						onClick={this.onDeleteClick.bind(this, account._id)}
						variant="danger"
					>
						X
					</Button>
					<inline>
						{account.institutionName} - {account.accountName}
					</inline>
				</p>
			));

		return (
			<div>
				<div className="col s12 accounts-wrapper">
					<Card className="accountsComponent">
						<Card.Body>
							<Card.Title>
								<h2>Accounts</h2>
							</Card.Title>
							<Card.Text>
								<div className="linked-accounts">
									<h6>Your Linked Accounts:</h6>
									<Accordion className="accountsAccordion">
										<Accordion.Item eventKey="0">
											<Accordion.Header as="p">Checkings</Accordion.Header>
											<Accordion.Body>
												{accounts.some(
													(account) => account.accountSubtype === 'checking') ? (
													<p>{checkingAccountItems}</p>
												) : (
													<Link />
												)}
											</Accordion.Body>
										</Accordion.Item>
										<Accordion.Item eventKey="1">
											<Accordion.Header as="p">Credit</Accordion.Header>
											<Accordion.Body>
												{accounts.some(
													(account) => account.accountSubtype === 'credit card') ? (
													<p>{creditAccountItems}</p>
												) : (
													<Link />
												)}
											</Accordion.Body>
										</Accordion.Item>
										<Accordion.Item eventKey="2">
											<Accordion.Header as="p">Savings</Accordion.Header>
											<Accordion.Body>
												{accounts.some(
													(account) => account.accountSubtype === 'savings'
												) ? (
													<p>{savingsAccountItems}</p>
												) : (
													<Link />
												)}
											</Accordion.Body>
										</Accordion.Item>
									</Accordion>
								</div>
							</Card.Text>
							<Link />
						</Card.Body>
					</Card>
				</div>
			</div>
		);
	}
}

Accounts.propTypes = {

	logout: PropTypes.func.isRequired,
	getTransactions: PropTypes.func.isRequired,
	setItem: PropTypes.func.isRequired,
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
	setItem: (userData) => dispatch(setItem(userData)),
	deleteAccount: (userData) => dispatch(deleteAccount(userData)),
});

export default connect(mapState, mapDispatch)(Accounts);
