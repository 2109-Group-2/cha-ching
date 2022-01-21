import React from 'react';
import MaterialTable from 'material-table';

export default function TransactionsTable(props) {
	const { transactions, transactionsLoading } = props;
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
		<div className='transactionsTable'>
			{transactionsLoading ? (
				<p className="grey-text text-darken-1">Fetching transactions...</p>
			) : (
				<>
					<MaterialTable
						columns={transactionsColumns}
						data={transactionsData}
						title="Search Transactions"
					/>
				</>
			)}
		</div>
	);
}
