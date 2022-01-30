import React, { useEffect, Component } from 'react';
import { PlaidLink } from 'react-plaid-link';
import { connect } from 'react-redux';
import { getAccounts, setLinkToken, setItem, getTransactions } from '../store/plaid';

class Link extends Component {
	constructor(props) {
		super(props);

		this.onExit = this.onExit.bind(this);
		this.onEvent = this.onEvent.bind(this);
		this.onSuccess = this.onSuccess.bind(this);
	}
	onExit(error, metadata) {
		return console.log('onExit', error, metadata);
	}

	onEvent(eventName, metadata) {
		console.log('onEvent ', eventName, metadata.link_session_id);
		if (eventName === 'HANDOFF') {
			this.props.getAccounts(this.props.auth.user);
			this.props.getTransactions(this.props.plaid.accounts);
		}
	}

	onSuccess(token, metadata) {
		console.log('onSuccess', token, metadata);
		this.props.setItem(token, this.props.auth.user.id, metadata);
	}

	componentDidMount() {
		this.props.setLinkToken(this.props.auth.user.id);
	}

	render() {
		const { id } = this.props.plaid;

		return (
			<div>
				<PlaidLink
					className="CustomButton"
					style={{ padding: '20px', fontSize: '16px', cursor: 'pointer' }}
					token={this.props.plaid.token ? this.props.plaid.token : ''}
					onExit={this.onExit}
					onSuccess={this.onSuccess}
					onEvent={this.onEvent}
				>
					Connect an Account!
				</PlaidLink>
			</div>
		);
	}
}

const mapState = (state) => {
	return {
		auth: state.auth,
		plaid: state.plaid,
	};
};

const mapDispatch = (dispatch) => {
	return {
		getAccounts: (userData) => dispatch(getAccounts(userData)),
		setLinkToken: (userId) => dispatch(setLinkToken(userId)),
		setItem: (token, userId, metadata) =>
			dispatch(setItem(token, userId, metadata)),
			getTransactions: (userData) => dispatch(getTransactions(userData)),
	};
};

export default connect(mapState, mapDispatch)(Link);
