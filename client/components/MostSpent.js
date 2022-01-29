import React from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment';

export default function MostSpent(props) {
  const mostExpensive = props.transactionsByDate.sort((a, b) => {
    return b.amount - a.amount
  })
  let firstThree = mostExpensive.slice(0, 3)

  return <div className='pieChart'>
    <h6>Most Expensive Transactions:</h6>
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
									{firstThree.map((data) => {
										return (
											<tr key={data._id}>
												<td>{data.account}</td>
												<td>{moment(data.date).format('M/d/YYYY')}</td>
												<td>{data.name}</td>
												<td>${data.amount}</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
  </div>;
}
