import React from 'react';
import { Table, Card, Button } from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function MiniTransaction(props) {
	let transactionsData = [];

	props.transactions.forEach(function (account) {
		account.transactions.forEach(function (transaction) {
			transactionsData.push({
				account: account.accountName,
				date: transaction.date,
				name: transaction.name,
				amount: transaction.amount,
			});
		});
	});

	const tenDays = moment().subtract(10, 'days').format('YYYY-MM-DD');
	const mostRecent = transactionsData.filter((data, i) => {
		return String(data.date) === String(tenDays);
	});
	console.log('<--- Most Recent --->', mostRecent);
	return (
		<div>
			<Card className="accountsComponent">
				<Card.Body>
					<Card.Title>
						<h2>Transactions</h2>
					</Card.Title>
					<Card.Text>
						<div className="recent-transactions">
							<h6>Most Recent Transactions:</h6>
							<Table responsive="sm" hover>
								<thead>
									<tr>
										<th>Account</th>
										<th>Date</th>
										<th>Name</th>
										<th>Amount</th>
									</tr>
								</thead>
								<tbody>
									{mostRecent.map((data) => {
										return (
											<tr>
												<td>{data.account}</td>
												<td>{moment(data.date).format('M/d/YYYY')}</td>
												<td>{data.name}</td>
												<td>${data.amount}</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
						</div>
					</Card.Text>
					<Button>
						<Link to="/transactions">See More</Link>
					</Button>
				</Card.Body>
			</Card>
		</div>
	);
}
