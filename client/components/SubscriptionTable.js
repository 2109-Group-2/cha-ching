import React from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { getSubscriptions, deleteSubscription } from '../store/auth';
import moment from 'moment';

function SubscriptionTable(props) {
	const { subscriptions } = props;
	const onDeleteClick = (id) => {
		const { subscriptions } = props.auth;
		const subscriptionData = {
			id: id,
			subscriptions: subscriptions,
		};
		props.deleteSubscription(subscriptionData);
	};
	return (
		<div>
			<Table responsive="sm" hover>
				<thead>
					<tr>
						<th>Name</th>
						<th>Account Name</th>
						<th>Start Date</th>
						<th>Frequency</th>
						<th>Price</th>
						<th>Delete?</th>
					</tr>
				</thead>
				<tbody>
					{subscriptions.map((data) => {
						return (
							<tr key={data._id}>
								<td>{data.name}</td>
								<td>{data.accountName}</td>
								<td>{moment(data.startDate).format('M/d/YYYY')}</td>
								<td>{data.frequency}</td>
								<td>${data.price}</td>
								<td>
									<Button
										onClick={onDeleteClick.bind(this, data._id)}
										variant="danger"
									>
										X
									</Button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</div>
	);
}

// import React, { Component } from 'react';

// export default class SubscriptionTable extends Component {

//   render() {
//     const { subscriptions } = this.props;
//   const onDeleteClick = (id) => {
// 		const { subscriptions } = this.props.auth;
// 		const subscriptionData = {
// 			id: id,
// 			subscriptions: subscriptions,
// 		};
// 		this.props.deleteSubscription(subscriptionData);
// 	};
//     return <div></div>;
//   }
// }

const mapState = (state) => ({
	auth: state.auth,
});

const mapDispatch = (dispatch) => ({
	getSubscriptions: (userData) => dispatch(getSubscriptions(userData)),
	deleteSubscription: (subscriptionData) =>
		dispatch(deleteSubscription(subscriptionData)),
});

export default connect(mapState, mapDispatch)(SubscriptionTable);
