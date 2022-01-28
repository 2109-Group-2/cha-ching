import React from 'react';
import { Table } from 'react-bootstrap';

export default function MostSpent(props) {
  const mostExpensive = props.transactionsByDate.sort((a, b) => {
    return b.amount - a.amount
  })
  let firstThree = mostExpensive.slice(0, 3)
  console.log("Most Expensive --->", firstThree)

  return <div className='pieChart'>
    <h6>Most Expensive Transactions:</h6>
    <Table hover>
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
											<tr key={data.id}>
												<td>{data.account}</td>
												<td>{data.date}</td>
												<td>{data.name}</td>
												<td>${data.amount}</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
  </div>;
}
