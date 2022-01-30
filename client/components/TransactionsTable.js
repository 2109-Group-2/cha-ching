import React from 'react';
import MaterialTable from 'material-table';

export default function TransactionsTable(props) {
	const { transactionsByDate } = props;
	
	const transactionsColumns = [
		{ title: 'Account', field: 'account' },
		{ title: 'Date', field: 'date', type: 'date', defaultSort: 'desc' },
		{ title: 'Name', field: 'name' },
		{ title: 'Amount', field: 'amount' },
		{ title: 'Category', field: 'category' },
	];

	return (
		<div className="transactionsTable">
			{!transactionsByDate ? (
				<p className="grey-text text-darken-1">Fetching transactions...</p>
			) : (
				<>
					<MaterialTable
						columns={transactionsColumns}
						data={transactionsByDate}
						title="Search Transactions"
					/>
				</>
			)}
		</div>
	);
}
